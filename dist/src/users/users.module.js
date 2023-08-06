"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../../resource/db/entities/User");
const users_service_1 = require("./service/users.service");
const users_controller_1 = require("./controller/users.controller");
const auth_module_1 = require("../auth/auth.module");
const user_implement_1 = require("./interface/user.implement");
const user_command_repository_1 = require("./repository/user-command.repository");
const user_query_repository_1 = require("./repository/user-query.repository");
const error_reponse_1 = require("../aop/exception/error-reponse");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([User_1.User]), (0, common_1.forwardRef)(() => auth_module_1.AuthModule)],
        providers: [
            users_service_1.UsersService,
            user_implement_1.UserImpl,
            user_command_repository_1.CustomUserCommandRepository,
            user_query_repository_1.CustomUserQueryRepository,
            error_reponse_1.ErrorResponse
        ],
        exports: [users_service_1.UsersService],
        controllers: [users_controller_1.UsersController],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map