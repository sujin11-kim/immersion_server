import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { HttpException, Injectable } from "@nestjs/common";
import { User } from "resource/db/entities/User";
import { Repository } from "typeorm";
import { LoginRequestDto } from "./dto/login.request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import axios, { AxiosInstance } from "axios";
@Injectable()
export class AuthService {
  private readonly axiosInstance: AxiosInstance;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {
    this.axiosInstance = axios.create({
      baseURL: "https://kapi.kakao.com/v2/user/me",
    });
  }

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException({ token: "" }, 201);
    }
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password
    );

    const payload = { email };

    if (user && (await bcrypt.compare(password, user.password))) {
      return { token: this.jwtService.sign(payload) };
    } else {
      throw new HttpException({ token: "" }, 201);
    }
  }

  async kakaoTokenToLocalToken(token: string): Promise<any> {
    try {
      const response = await this.axiosInstance.get("", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const kakaoUser = new User();
      kakaoUser.email = response.data.id;
      kakaoUser.nickName = response.data.properties.nickname;
      const kakaoId = kakaoUser.email;
      const checkExistUser = await this.userRepository.findOneBy({
        email: kakaoId,
      });
      if (!checkExistUser) {
        await this.userRepository.save(kakaoUser);
      }

      const userForToken = await this.userRepository.findOneBy({
        email: kakaoId,
      });
      const payload = { userIdx: userForToken.userIdx };
      return { token: this.jwtService.sign(payload) };
    } catch (error) {
      throw new HttpException({ token: "not authorization" }, 401);
    }
  }
}
