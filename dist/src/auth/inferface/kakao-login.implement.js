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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakaoLoginStrategy = void 0;
const common_1 = require("@nestjs/common");
const user_command_repository_1 = require("../../users/repository/user-command.repository");
const user_query_repository_1 = require("../../users/repository/user-query.repository");
const axios_1 = require("axios");
const error_reponse_1 = require("../../aop/exception/error-reponse");
let KakaoLoginStrategy = class KakaoLoginStrategy {
    constructor(customUserCommandRepository, customUserQueryRepository, errorResponse) {
        this.customUserCommandRepository = customUserCommandRepository;
        this.customUserQueryRepository = customUserQueryRepository;
        this.errorResponse = errorResponse;
        this.axiosInstance = axios_1.default.create({
            baseURL: "https://kapi.kakao.com/v2/user/me",
        });
    }
    async kakaoToLocalToken(token) {
        const response = await this.axiosInstance.get("", {
            headers: { Authorization: `Bearer ${token}` },
        });
        try {
            this.kakaoUser.email = response.data.id;
            this.kakaoUser.nickName = response.data.properties.nickname;
            const user = await this.customUserQueryRepository.getUserByEmail(this.kakaoUser.email);
            this.kakaoUser.userIdx = user ? (await this.customUserQueryRepository.getUserByEmail(this.kakaoUser.email)).userIdx : (await this.customUserCommandRepository.saveUser(this.kakaoUser)).userIdx;
            const payload = { userIdx: this.kakaoUser.userIdx };
            return { token: this.jwtService.sign(payload) };
        }
        catch (error) {
            this.errorResponse.notAuthorization();
        }
    }
};
KakaoLoginStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_command_repository_1.CustomUserCommandRepository,
        user_query_repository_1.CustomUserQueryRepository,
        error_reponse_1.ErrorResponse])
], KakaoLoginStrategy);
exports.KakaoLoginStrategy = KakaoLoginStrategy;
//# sourceMappingURL=kakao-login.implement.js.map