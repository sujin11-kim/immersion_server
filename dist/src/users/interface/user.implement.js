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
exports.UserImpl = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const User_1 = require("../../../resource/db/entities/User");
const typeorm_2 = require("typeorm");
const user_command_repository_1 = require("../repository/user-command.repository");
const user_query_repository_1 = require("../repository/user-query.repository");
let UserImpl = class UserImpl {
    constructor(customUserCommandRepository, customUserQueryRepository, userEntityRepository) {
        this.customUserCommandRepository = customUserCommandRepository;
        this.customUserQueryRepository = customUserQueryRepository;
        this.userEntityRepository = userEntityRepository;
    }
    async createUser(userInfo) {
        const hashedPassword = await bcrypt.hash(userInfo.password, 12);
        await this.customUserQueryRepository.checkDuplicate(userInfo);
        const newUser = await this.customUserCommandRepository.saveUser(Object.assign(Object.assign({}, userInfo), { password: hashedPassword }));
        return { userIdx: newUser.userIdx.toString() };
    }
    async getAllFCM() {
        const allFcmtoken = await this.customUserQueryRepository.findAllFcm();
        return allFcmtoken;
    }
    async getFCMByUserIdx(userIdx) {
        await this.customUserQueryRepository.isUserExistsByUserIdx(userIdx);
        const fcmToken = await this.customUserQueryRepository.getFCMByUserIdx(userIdx);
        return { fcmToken };
    }
};
UserImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [user_command_repository_1.CustomUserCommandRepository,
        user_query_repository_1.CustomUserQueryRepository,
        typeorm_2.Repository])
], UserImpl);
exports.UserImpl = UserImpl;
//# sourceMappingURL=user.implement.js.map