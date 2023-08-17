import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CustomUserCommandRepository } from "../../users/repository/user-command.repository";
import { CustomUserQueryRepository } from "../../users/repository/user-query.repository";
import axios, { AxiosInstance } from "axios";
import { SocialUserDto } from "../dto/social-login.dto";
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { Payload } from "../utils/jwt/jwt.payloads";
import { User } from "resource/db/entities/User";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class KakaoLoginStrategy {
  private readonly jwtService: JwtService;
  private readonly axiosInstance: AxiosInstance;
  private kakaoUser: SocialUserDto;
  constructor(
    private readonly customUserCommandRepository: CustomUserCommandRepository,
    private readonly customUserQueryRepository: CustomUserQueryRepository,
    private readonly errorResponse: ErrorResponse, 
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    this.axiosInstance = axios.create({
      baseURL: "https://kapi.kakao.com/v2/user/me",
    });
  }

  public async kakaoToLocalToken(token: string): Promise<any>
  {
    const response = await this.axiosInstance.get("", {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.kakaoUser.email = response.data.id;
    this.kakaoUser.nickName = response.data.properties.nickname;

    const queryRunner = this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction("REPEATABLE READ");
      const user = await this.customUserQueryRepository.getByEmail(this.kakaoUser.email, queryRunner);

      this.kakaoUser.userIdx = user ? (await this.customUserQueryRepository.getByEmail(this.kakaoUser.email)).userIdx : (await this.customUserCommandRepository.signUp(this.kakaoUser, queryRunner)).userIdx

      const payload = { userIdx: this.kakaoUser.userIdx };
      return { token: this.jwtService.sign(payload) };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.errorResponse.notAuthorizationKakao();
    }finally {
      await queryRunner.release();
    }
  }
}