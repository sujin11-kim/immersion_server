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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dto/create-user.dto");
const users_service_1 = require("./users.service");
const auth_service_1 = require("../auth/auth.service");
const login_request_dto_1 = require("../auth/dto/login.request.dto");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const user_decorator_1 = require("../common/decorators/user.decorator");
const use_interceptors_decorator_1 = require("@nestjs/common/decorators/core/use-interceptors.decorator");
const suucess_interceptor_1 = require("../common/intercepors/suucess.interceptor");
const exception_filters_decorator_1 = require("@nestjs/common/decorators/core/exception-filters.decorator");
const http_exception_filter_1 = require("../common/exception/http-exception.filter");
const register_success_interceptor_1 = require("../common/intercepors/register.success.interceptor");
const register_http_exceptoin_filter_1 = require("../common/exception/register.http-exceptoin.filter");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async create(dto) {
        const { id, nickName, phone, enrollDate, password } = dto;
        return await this.usersService.create(id, nickName, phone, enrollDate, password);
    }
    login(data) {
        return this.authService.jwtLogIn(data);
    }
    getCurrentUser(user) {
        return user;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "회원가입" }),
    (0, use_interceptors_decorator_1.UseInterceptors)(register_success_interceptor_1.RegisterSuccessInterceptor),
    (0, exception_filters_decorator_1.UseFilters)(register_http_exceptoin_filter_1.RegisterHttpExceptionFilter),
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "로그인" }),
    (0, use_interceptors_decorator_1.UseInterceptors)(suucess_interceptor_1.SuccessInterceptor),
    (0, exception_filters_decorator_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_request_dto_1.LoginRequestDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "인증확인:현재유저 가져오기" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getCurrentUser", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)("USERS"),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map