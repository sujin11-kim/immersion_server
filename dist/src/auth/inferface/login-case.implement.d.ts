import { LoginInterface } from "./login-case.interface";
import { LocalLoginStrategy } from "./local-login.implement";
import { KakaoLoginStrategy } from "./kakao-login.implement";
import { AppleLoginStrategy } from "./apple-login.implement";
export declare class LoginImpl implements LoginInterface {
    private readonly localLoginStrategy;
    private readonly kakaoLoginStrategy;
    private readonly appleLoginStrategy;
    constructor(localLoginStrategy: LocalLoginStrategy, kakaoLoginStrategy: KakaoLoginStrategy, appleLoginStrategy: AppleLoginStrategy);
    getTokenByCase(email: string, password: string, loginType: string, token: string): Promise<any>;
}
