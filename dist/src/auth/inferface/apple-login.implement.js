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
exports.AppleLoginStrategy = void 0;
const jwt = require("jsonwebtoken");
const jwks_rsa_1 = require("jwks-rsa");
const common_1 = require("@nestjs/common");
const error_reponse_1 = require("../../aop/exception/error-reponse");
const user_command_repository_1 = require("../../users/repository/user-command.repository");
const user_query_repository_1 = require("../../users/repository/user-query.repository");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const User_1 = require("../../../resource/db/entities/User");
let AppleLoginStrategy = class AppleLoginStrategy {
    constructor(customUserCommandRepository, customUserQueryRepository, errorResponse, userRepository) {
        this.customUserCommandRepository = customUserCommandRepository;
        this.customUserQueryRepository = customUserQueryRepository;
        this.errorResponse = errorResponse;
        this.userRepository = userRepository;
    }
    async appleToLocalToken(appleIdToken) {
        const decodedToken = jwt.decode(appleIdToken, { complete: true });
        const keyIdFromToken = decodedToken.header.kid;
        const applePublicKeyUrl = 'https://appleid.apple.com/auth/keys';
        const jwksClient = new jwks_rsa_1.JwksClient({ jwksUri: applePublicKeyUrl });
        const key = await jwksClient.getSigningKey(keyIdFromToken);
        const publicKey = key.getPublicKey();
        const verifiedDecodedToken = jwt.verify(appleIdToken, publicKey, {
            algorithms: [decodedToken.header.alg]
        });
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        try {
            await queryRunner.startTransaction("REPEATABLE READ");
            this.appleUser.email = verifiedDecodedToken.email;
            const user = await this.customUserQueryRepository.getByEmail(this.appleUser.email, queryRunner);
            this.appleUser.userIdx = user ? (await this.customUserQueryRepository.getByEmail(this.appleUser.email, queryRunner)).userIdx : (await this.customUserCommandRepository.signUp(this.appleUser, queryRunner)).userIdx;
            const payload = { userIdx: this.appleUser.userIdx };
            return { token: this.jwtService.sign(payload) };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            this.errorResponse.notAuthorizationApple();
        }
        finally {
            await queryRunner.release();
        }
    }
};
AppleLoginStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [user_command_repository_1.CustomUserCommandRepository,
        user_query_repository_1.CustomUserQueryRepository,
        error_reponse_1.ErrorResponse,
        typeorm_2.Repository])
], AppleLoginStrategy);
exports.AppleLoginStrategy = AppleLoginStrategy;
//# sourceMappingURL=apple-login.implement.js.map