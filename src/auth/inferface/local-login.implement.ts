import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { CustomUserQueryRepository } from "src/users/repository/user-query.repository";
import { CustomUserCommandRepository } from "src/users/repository/user-Command.repository";
import { ErrorResponse } from "src/aop/exception/error-reponse";
import Redis from "ioredis";
import { InjectRedis } from "@liaoliaots/nestjs-redis";
import { CustomLogger } from "resource/logger/custom-logger";

@Injectable()
export class LocalLoginStrategy {
  
  private email_: string;
  private password_: string | null;
  private userIdx_: number | null;
  constructor(
    @InjectRedis() private readonly client: Redis,
    private readonly jwtService: JwtService,
    private readonly customUserCommandRepository: CustomUserCommandRepository,
    private readonly customUserQueryRepository: CustomUserQueryRepository,
    private readonly errorResponse: ErrorResponse
  ) {}
  
  public setter(email: string, password: string){
    this.email_ = email;
    this.password_ = password;
  }

  public async getLocalTokens() {
    const user = await this.customUserQueryRepository.getByEmail(this.email_);
    
    if(!user) this.errorResponse.notExistUser();

    if(await bcrypt.compare(this.password_, user.password))
    {
      this.userIdx_ = user.userIdx;
      const payload = { userIdx: this.userIdx_ };
      const accessToken = this.getAccessToken(payload);
      const refreshToken = this.getRefreshToken(payload)
      
      return { accessToken: accessToken, refreshToken: refreshToken };
    }

    else this.errorResponse.comparePassword(user.password);
  }

  private getAccessToken(payload) {
    return this.jwtService.sign(payload, {
      secret : process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn : process.env.JWT_ACCESS_TOKEN_EXPIRED_TIME
    }) 
  }

  private getRefreshToken(payload) {
    const refreshToken = this.jwtService.sign(payload, {
      secret : process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn : process.env.JWT_REFRESH_TOKEN_EXPIRED_TIME
    })
    this.hashAndStoreRefreshToken(refreshToken);
    return refreshToken;
  }

  private async hashAndStoreRefreshToken(refreshToken) {
    await bcrypt.hash(refreshToken, 10);
    // user DB에 hash 된 refresh token 저장
    // userIdx 는 어디서 하지..
    const user = await this.customUserQueryRepository.getByEmail(this.email_);

    this.customUserCommandRepository.storeRefreshToken(user, refreshToken);
    // await this.client.set('cats', JSON.stringify(refreshToken), 'EX', 120);
  }

  public async CheckRT(){
    // db에 있는 refresh token 비교 후 맞으면 true
  }

  public async setAccessTokenExpired(){
    storeAccessTokenToRedis
  }


}

