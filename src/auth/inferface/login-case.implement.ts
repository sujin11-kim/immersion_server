import { Injectable  } from "@nestjs/common";
import { check } from "prettier";
import { LoginInterface } from "./login-case.interface";
import { LocalLoginStrategy } from "./local-login.implement";
import { KakaoLoginStrategy } from "./kakao-login.implement";
import { AppleLoginStrategy } from "./apple-login.implement";
import { Payload } from "../utils/jwt/jwt.payloads";

@Injectable()
export class LoginImpl implements LoginInterface  {
  constructor(
    private readonly localLoginStrategy: LocalLoginStrategy,
    private readonly kakaoLoginStrategy: KakaoLoginStrategy,
    private readonly appleLoginStrategy: AppleLoginStrategy,
  ) {}

  async getTokenByCase(email: string, password: string, loginType: string, token: string): Promise<any> {
    switch(loginType) {
      case "local" :
        this.localLoginStrategy.setter(email, password);
        const localToken = await this.localLoginStrategy.getLocalToken();
        return localToken;
  
      case "kakao" : 
        const kakaoToken = await this.kakaoLoginStrategy.kakaoToLocalToken(token);
        return kakaoToken;

      case "apple" :
        const appleToken = await this.appleLoginStrategy.appleToLocalToken(token);
        return appleToken;
    }
  }
}
