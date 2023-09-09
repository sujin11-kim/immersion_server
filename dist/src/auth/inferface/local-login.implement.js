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
exports.LocalLoginStrategy = void 0;
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const user_query_repository_1 = require("../../users/repository/user-query.repository");
const user_Command_repository_1 = require("../../users/repository/user-Command.repository");
const error_reponse_1 = require("../../aop/exception/error-reponse");
const ioredis_1 = require("ioredis");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
let LocalLoginStrategy = class LocalLoginStrategy {
    constructor(client, jwtService, customUserCommandRepository, customUserQueryRepository, errorResponse) {
        this.client = client;
        this.jwtService = jwtService;
        this.customUserCommandRepository = customUserCommandRepository;
        this.customUserQueryRepository = customUserQueryRepository;
        this.errorResponse = errorResponse;
    }
    setter(email, password) {
        this.email_ = email;
        this.password_ = password;
    }
    async getLocalTokens() {
        const user = await this.customUserQueryRepository.getByEmail(this.email_);
        if (!user)
            this.errorResponse.notExistUser();
        if (await bcrypt.compare(this.password_, user.password)) {
            this.userIdx_ = user.userIdx;
            const payload = { userIdx: this.userIdx_ };
            const accessToken = this.getAccessToken(payload);
            const refreshToken = this.getRefreshToken(payload);
            return { accessToken: accessToken, refreshToken: refreshToken };
        }
        else
            this.errorResponse.comparePassword(user.password);
    }
    getAccessToken(payload) {
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED_TIME
        });
    }
    getRefreshToken(payload) {
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_TOKEN_SECRET,
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED_TIME
        });
        this.hashAndStoreRefreshToken(refreshToken);
        return refreshToken;
    }
    async hashAndStoreRefreshToken(refreshToken) {
        await bcrypt.hash(refreshToken, 10);
        const user = await this.customUserQueryRepository.getByEmail(this.email_);
        this.customUserCommandRepository.storeRefreshToken(user, refreshToken);
    }
};
LocalLoginStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_redis_1.InjectRedis)()),
    __metadata("design:paramtypes", [ioredis_1.default,
        jwt_1.JwtService,
        user_Command_repository_1.CustomUserCommandRepository,
        user_query_repository_1.CustomUserQueryRepository,
        error_reponse_1.ErrorResponse])
], LocalLoginStrategy);
exports.LocalLoginStrategy = LocalLoginStrategy;
//# sourceMappingURL=local-login.implement.js.map