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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const User_1 = require("../../mymodel/entities/User");
let UsersService = class UsersService {
    constructor(userRepository, dataSource) {
        this.userRepository = userRepository;
        this.dataSource = dataSource;
    }
    async create(email, nickname, phone, password) {
        const queryRunner = this.dataSource.createQueryRunner();
        const hashedPassword = await bcrypt.hash(password, 12);
        const userEmail = await this.userRepository.findOne({ where: { email } });
        console.log(userEmail);
        if (userEmail) {
            throw new common_1.HttpException({ message: "이미 존재하는 이메일 입니다." }, 201);
        }
        const user = new User_1.User();
        (user.email = email),
            (user.nickName = nickname),
            (user.phone = phone),
            (user.password = hashedPassword),
            await queryRunner.manager.save(user);
        return user.userIdx;
    }
    async saveFCMToken(loginUser, fcmToken) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const user = await this.userRepository.findOne({
                where: { email: loginUser.email },
            });
            if (!user) {
                throw new Error("User not found");
            }
            user.fcmtoken = fcmToken;
            const updateUser = await this.userRepository.save(user);
            console.log(user);
            await queryRunner.commitTransaction();
            return { message: "FCM 토큰이 저장되었습니다." };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findFCM() {
        const users = await this.userRepository.find();
        const fcmTokens = users.reduce((result, user) => {
            result[user.userIdx] = user.fcmtoken;
            return result;
        }, {});
        return { fcmTokens };
    }
    async login(_id, _password) {
        throw new Error("Method not implemented");
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map