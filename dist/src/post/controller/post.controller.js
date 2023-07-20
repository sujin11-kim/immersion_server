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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("../service/post.service");
const create_post_dto_1 = require("../dto/create-post.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/jwt/jwt.guard");
const user_decorator_1 = require("../../../src/aop/decorators/user.decorator");
const user_login_dto_1 = require("../../users/dto/user-login.dto");
const success_interceptor_1 = require("../../../src/aop/interceptors/success.interceptor");
const http_exception_filter_1 = require("../../../src/aop/exception/http-exception.filter");
const positiveInt_pipe_1 = require("../../aop/pipes/positiveInt.pipe");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    create(createPostDto, user) {
        return this.postService.createPost(user, createPostDto);
    }
    findIdPost(user) {
        return this.postService.findIdPost(user.userIdx);
    }
    findCategoryPost(category) {
        return this.postService.findCategoryPost(category);
    }
    findAll(page, pageSize) {
        return this.postService.findAll(page, pageSize);
    }
    postLike(postIdx, user) {
        return this.postService.postLike(user, postIdx);
    }
    postLikeCancel(postIdx, user) {
        return this.postService.postLikeCancel(user, postIdx);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "로그인한 user로 게시물 작성" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto,
        user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "로그인한 user의 게시물 조회" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("/get/userIdx"),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findIdPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "카테고리로 게시물 조회" }),
    (0, common_1.Get)("/get/category"),
    __param(0, (0, common_1.Body)("category")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findCategoryPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "게시물 전체 조회" }),
    (0, common_1.Get)("/get/all"),
    __param(0, (0, common_1.Query)("page", common_1.ParseIntPipe, positiveInt_pipe_1.PositiveIntPipe)),
    __param(1, (0, common_1.Query)("pageSize", common_1.ParseIntPipe, positiveInt_pipe_1.PositiveIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "게시물 좋아요" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("/like"),
    __param(0, (0, common_1.Body)("postIdx", common_1.ParseIntPipe, positiveInt_pipe_1.PositiveIntPipe)),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "postLike", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "게시물 좋아요 취소" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("/like/cancel"),
    __param(0, (0, common_1.Body)("postIdx")),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "postLikeCancel", null);
PostController = __decorate([
    (0, swagger_1.ApiTags)("POST"),
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    (0, common_1.Controller)("post"),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map