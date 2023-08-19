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
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const user_query_repository_1 = require("../../../users/repository/user-query.repository");
const jwt = require("jsonwebtoken");
const jsonwebtoken_1 = require("jsonwebtoken");
const error_reponse_1 = require("../../../aop/exception/error-reponse");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(customUserQueryRepository, errorResponse) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            ignoreExpiration: true,
        });
        this.customUserQueryRepository = customUserQueryRepository;
        this.errorResponse = errorResponse;
    }
    async validate(req) {
        var _a;
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.slice(7);
        if (!token)
            throw new common_1.BadRequestException('There is no access token in header');
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            const payload = jwt.decode(token);
            const { userIdx } = payload["userIdx"];
            const user = await this.customUserQueryRepository.getByUserIdx(userIdx);
            if (!user)
                this.errorResponse.notAuthorizationLogin();
            else
                return user;
        }
        catch (e) {
            if (e instanceof SyntaxError) {
                throw new common_1.BadRequestException('Invalid JSON object');
            }
            if (e instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new common_1.UnauthorizedException('Token is expired');
            }
            if (e instanceof jsonwebtoken_1.JsonWebTokenError) {
                throw new common_1.BadRequestException(e.message);
            }
            throw e;
        }
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_query_repository_1.CustomUserQueryRepository,
        error_reponse_1.ErrorResponse])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map