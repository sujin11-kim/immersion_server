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
const auth_service_1 = require("./auth.service");
const user_entity_1 = require("../../mymodel/entities/user.entity");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const users_module_1 = require("../users/users.module");
const jwt_strategy_1 = require("./jwt/jwt.strategy");
let AuthModule = AuthModule_1 = class AuthModule {
};
AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            passport_1.PassportModule.register({ defaultStrategy: "jwt", session: false }),
            jwt_1.JwtModule.register({
                secret: "secretKey",
                signOptions: { expiresIn: "1y" },
            }),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [AuthModule_1, auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map