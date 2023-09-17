import { Inject, Injectable,
  UseInterceptors } from "@nestjs/common";
import { check } from "prettier";
import { LoginInterface } from "./login-case.interface";
import { LocalLoginStrategy } from "./local-login.implement";
import { KakaoLoginStrategy } from "./kakao-login.implement";
import { AppleLoginStrategy } from "./apple-login.implement";
import { Payload } from "../utils/jwt/jwt.payloads";
import { Cache  } from 'cache-manager';
import { ErrorResponse } from "src/aop/exception/error-reponse";
import axios from 'axios';
import * as crypto from 'crypto';
import { CACHE_MANAGER } from "@nestjs/cache-manager";
// import { SMS } from './dto/sms';

const ACCESS_KEY_ID = process.env.NAVER_ACCESS_KEY_ID;
const SECRET_KEY = process.env.NAVER_SECRET_KEY;
const SMS_SERVICE_ID = process.env.NAVER_SMS_SERVICE_ID;

@Injectable()
// @UseInterceptors(CacheInterceptor)
export class LoginImpl implements LoginInterface {
  
  constructor(
    private readonly localLoginStrategy: LocalLoginStrategy,
    private readonly kakaoLoginStrategy: KakaoLoginStrategy,
    private readonly appleLoginStrategy: AppleLoginStrategy,
    private readonly errorResponse: ErrorResponse,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getTokenByCase(
    email: string,
    password: string,
    loginType: string,
    token: string
  ): Promise<any> {
    switch (loginType) {
      case "local":
        this.localLoginStrategy.setter(email, password);
        const localToken = await this.localLoginStrategy.getLocalTokens();
        return localToken;

      case "kakao":
        const kakaoToken = await this.kakaoLoginStrategy.kakaoToLocalToken(
          token
        );
        return kakaoToken;

      case "apple":
        const appleToken = await this.appleLoginStrategy.appleToLocalToken(
          token
        );
        return appleToken;
    }
  }
    // SMS 인증 위한 시그니쳐 생성 로직
  
  public deleteToken(){
    return { token : " " };
  }
}
