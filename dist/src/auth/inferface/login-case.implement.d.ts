import { LoginInterface } from "./login-case.interface";
import { LocalLoginStrategy } from "./local-login.implement";
import { KakaoLoginStrategy } from "./kakao-login.implement";
import { AppleLoginStrategy } from "./apple-login.implement";
import { Cache } from 'cache-manager';
import { ErrorResponse } from "src/aop/exception/error-reponse";
export declare class LoginImpl implements LoginInterface {
    private readonly localLoginStrategy;
    private readonly kakaoLoginStrategy;
    private readonly appleLoginStrategy;
    private readonly errorResponse;
    private cacheManager;
    constructor(localLoginStrategy: LocalLoginStrategy, kakaoLoginStrategy: KakaoLoginStrategy, appleLoginStrategy: AppleLoginStrategy, errorResponse: ErrorResponse, cacheManager: Cache);
    getTokenByCase(email: string, password: string, loginType: string, token: string): Promise<any>;
    deleteToken(): {
        token: string;
    };
}
