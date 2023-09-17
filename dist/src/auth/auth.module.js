"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./service/auth.service");
const User_1 = require("../../resource/db/entities/User");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const users_module_1 = require("../users/users.module");
const local_login_implement_1 = require("./inferface/local-login.implement");
const kakao_login_implement_1 = require("./inferface/kakao-login.implement");
const apple_login_implement_1 = require("./inferface/apple-login.implement");
const login_case_implement_1 = require("./inferface/login-case.implement");
const user_query_repository_1 = require("../users/repository/user-query.repository");
const user_command_repository_1 = require("../users/repository/user-command.repository");
const error_reponse_1 = require("../aop/exception/error-reponse");
const access_token_strategy_1 = require("./utils/jwt/access-token.strategy");
const refresh_token_strategy_1 = require("./utils/jwt/refresh-token.strategy");
const cache_manager_1 = require("@nestjs/cache-manager");
let AuthModule = AuthModule_1 = class AuthModule {
};
AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.register(),
            typeorm_1.TypeOrmModule.forFeature([User_1.User]),
            passport_1.PassportModule.register({ defaultStrategy: "jwt", session: false }),
            jwt_1.JwtModule.register({
                secret: "secretKey"
            }),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        providers: [
            auth_service_1.AuthService,
            login_case_implement_1.LoginImpl,
            access_token_strategy_1.ATStrategy,
            refresh_token_strategy_1.RTStrategy,
            local_login_implement_1.LocalLoginStrategy,
            kakao_login_implement_1.KakaoLoginStrategy,
            apple_login_implement_1.AppleLoginStrategy,
            user_command_repository_1.CustomUserCommandRepository,
            user_query_repository_1.CustomUserQueryRepository,
            error_reponse_1.ErrorResponse
        ],
        exports: [AuthModule_1, auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map