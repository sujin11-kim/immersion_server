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
exports.ATStrategy = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const user_query_repository_1 = require("../../../users/repository/user-query.repository");
const error_reponse_1 = require("../../../aop/exception/error-reponse");
const passport_jwt_1 = require("passport-jwt");
let ATStrategy = class ATStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy, 'jwt') {
    constructor(customUserQueryRepository, errorResponse) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_ACCESS_SECRET,
            ignoreExpiration: false,
        });
        this.customUserQueryRepository = customUserQueryRepository;
        this.errorResponse = errorResponse;
    }
    async validate(payload) {
        const { userIdx } = payload;
        const user = await this.customUserQueryRepository.getByUserIdx(userIdx);
        if (!user)
            this.errorResponse.notAuthorizationLogin();
        return user;
    }
};
ATStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_query_repository_1.CustomUserQueryRepository,
        error_reponse_1.ErrorResponse])
], ATStrategy);
exports.ATStrategy = ATStrategy;
//# sourceMappingURL=access-token.strategy.js.map