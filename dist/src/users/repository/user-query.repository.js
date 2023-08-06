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
exports.CustomUserQueryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../../../resource/db/entities/User");
const typeorm_2 = require("typeorm");
const custom_exception_1 = require("../../aop/exception/custom-exception");
let CustomUserQueryRepository = class CustomUserQueryRepository {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async checkDuplicate(userInfo) {
        const userByEmail = await this.userRepository.findOne({
            where: { email: userInfo.email },
        });
        if (userByEmail)
            throw new common_1.BadRequestException(custom_exception_1.CustomExceptions.EMAIL_ALREADY_EXISTS);
        const userBynickName = await this.userRepository.findOne({
            where: { nickName: userInfo.nickName },
        });
        if (userBynickName)
            throw new common_1.BadRequestException(custom_exception_1.CustomExceptions.NICKNAME_ALREADY_EXISTS);
        const userByphone = await this.userRepository.findOne({
            where: { phone: userInfo.phone },
        });
        if (userByphone)
            throw new common_1.BadRequestException(custom_exception_1.CustomExceptions.PHONE_ALREADY_EXISTS);
    }
    async findAllFcm() {
        const users = await this.userRepository.find();
        if (users.length === 0) {
            throw new common_1.BadRequestException(custom_exception_1.CustomExceptions.FCMTOKEN_NOT_FOUND);
        }
        const fcmTokens = users.reduce((result, user) => {
            result[user.userIdx] = user.fcmtoken;
            return result;
        }, {});
        return { fcmTokens };
    }
    async isUserExistsByUserIdx(userIdx) {
        const user = await this.userRepository.findOne({ where: { userIdx } });
        if (!user)
            throw new common_1.NotFoundException(custom_exception_1.CustomExceptions.USER_NOT_FOUND);
    }
    async getFCMByUserIdx(userIdx) {
        const user = await this.userRepository.findOne({ where: { userIdx } });
        const fcmToken = (user === null || user === void 0 ? void 0 : user.fcmtoken) || null;
        return fcmToken;
    }
};
CustomUserQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomUserQueryRepository);
exports.CustomUserQueryRepository = CustomUserQueryRepository;
//# sourceMappingURL=user-query.repository.js.map