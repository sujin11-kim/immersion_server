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
exports.AuthService = void 0;
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const User_1 = require("../../resource/db/entities/User");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const axios_1 = require("axios");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.axiosInstance = axios_1.default.create({
            baseURL: "https://kapi.kakao.com/v2/user/me",
        });
    }
    async jwtLogIn(data) {
        const { email, password } = data;
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new common_1.BadRequestException({
                statusCode: 2100,
                message: "존재하지 않는 사용자 입니다.",
            });
        }
        const isPasswordValidated = await bcrypt.compare(password, user.password);
        const payload = { email };
        if (user && (await bcrypt.compare(password, user.password))) {
            return { token: this.jwtService.sign(payload) };
        }
        else {
            throw new common_1.BadRequestException({
                statusCode: 2101,
                message: "이메일과 비밀번호를 다시 확인해 주세요.",
            });
        }
    }
    async kakaoTokenToLocalToken(token) {
        try {
            const response = await this.axiosInstance.get("", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const kakaoUser = new User_1.User();
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
        }
        catch (error) {
            throw new common_1.HttpException({ token: "not authorization" }, 401);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map