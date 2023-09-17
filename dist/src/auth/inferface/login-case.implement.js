"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginImpl = void 0;
const common_1 = require("@nestjs/common");
const local_login_implement_1 = require("./local-login.implement");
const kakao_login_implement_1 = require("./kakao-login.implement");
const apple_login_implement_1 = require("./apple-login.implement");
const error_reponse_1 = require("../../aop/exception/error-reponse");
const cache_manager_1 = require("@nestjs/cache-manager");
const ACCESS_KEY_ID = process.env.NAVER_ACCESS_KEY_ID;
const SECRET_KEY = process.env.NAVER_SECRET_KEY;
const SMS_SERVICE_ID = process.env.NAVER_SMS_SERVICE_ID;
let LoginImpl = class LoginImpl {
    constructor(localLoginStrategy, kakaoLoginStrategy, appleLoginStrategy, errorResponse, cacheManager) {
        this.localLoginStrategy = localLoginStrategy;
        this.kakaoLoginStrategy = kakaoLoginStrategy;
        this.appleLoginStrategy = appleLoginStrategy;
        this.errorResponse = errorResponse;
        this.cacheManager = cacheManager;
    }
    async getTokenByCase(email, password, loginType, token) {
        switch (loginType) {
            case "local":
                this.localLoginStrategy.setter(email, password);
                const localToken = await this.localLoginStrategy.getLocalTokens();
                return localToken;
            case "kakao":
                const kakaoToken = await this.kakaoLoginStrategy.kakaoToLocalToken(token);
                return kakaoToken;
            case "apple":
                const appleToken = await this.appleLoginStrategy.appleToLocalToken(token);
                return appleToken;
        }
    }
    deleteToken() {
        return { token: " " };
    }
};
LoginImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [local_login_implement_1.LocalLoginStrategy,
        kakao_login_implement_1.KakaoLoginStrategy,
        apple_login_implement_1.AppleLoginStrategy,
        error_reponse_1.ErrorResponse, Object])
], LoginImpl);
exports.LoginImpl = LoginImpl;
//# sourceMappingURL=login-case.implement.js.map