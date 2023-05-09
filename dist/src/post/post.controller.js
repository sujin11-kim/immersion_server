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
const post_service_1 = require("./post.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const user_decorator_1 = require("../common/decorators/user.decorator");
const user_login_dto_1 = require("../users/dto/user-login.dto");
const success_interceptor_1 = require("../common/interceptors/success.interceptor");
const http_exception_filter_1 = require("../common/exception/http-exception.filter");
const aws_service_1 = require("../aws.service");
let PostController = class PostController {
    constructor(postService, awsService) {
        this.postService = postService;
        this.awsService = awsService;
    }
    findAll(page, pageSize) {
        return this.postService.findAll(page, pageSize);
    }
    findIdPost(user) {
        return this.postService.findIdPost(user.id);
    }
    findCategoryPost(category) {
        console.log(category);
        return this.postService.findCategoryPost(category);
    }
    create(createPostDto, files, user) {
        const { category, title, content } = createPostDto;
        console.log("파일 이름");
        console.log(files);
        return this.postService.createPost(user, category, title, content, files);
    }
    postLike(postIdx, user) {
        return this.postService.postLike(user, postIdx);
    }
    postLikeCancel(postIdx, user) {
        return this.postService.postLikeCancel(user, postIdx);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "모든 게시물 조회" }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("pageSize")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "현재 user의 게시물 조회" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("/userIdx"),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findIdPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "카테고리 게시물 조회" }),
    (0, common_1.Get)("/category"),
    __param(0, (0, common_1.Query)("category")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findCategoryPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "게시물 생성" }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("image", 10)),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Array, user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "게시물 좋아요" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("/likePost"),
    __param(0, (0, common_1.Body)("postIdx")),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "postLike", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "게시물 좋아요 취소" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("/likeCancelPost"),
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
    (0, common_1.Controller)("posts"),
    __metadata("design:paramtypes", [post_service_1.PostService,
        aws_service_1.AwsService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map