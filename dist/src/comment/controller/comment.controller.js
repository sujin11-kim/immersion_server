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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("../service/comment.service");
const create_comment_dto_1 = require("../dto/create-comment.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/jwt/jwt.guard");
const success_interceptor_1 = require("../../../src/aop/interceptors/success.interceptor");
const http_exception_filter_1 = require("../../../src/aop/exception/http-exception.filter");
const user_decorator_1 = require("../../../src/aop/decorators/user.decorator");
const user_login_dto_1 = require("../../users/dto/user-login.dto");
const like_comment_dto_1 = require("../dto/like-comment.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    createComment(createCommentDto, user) {
        return this.commentService.createComment(user.userIdx, createCommentDto);
    }
    findAllComment(postIdx) {
        return this.commentService.findAllComment(postIdx);
    }
    commentLike(Idx) {
        const { userIdx, postIdx, commentIdx } = Idx;
        return this.commentService.commentLike(userIdx, postIdx, commentIdx);
    }
    commentLikeCancel(Idx) {
        const { userIdx, postIdx, commentIdx } = Idx;
        return this.commentService.postLikeCancel(userIdx, postIdx, commentIdx);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto,
        user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "createComment", null);
__decorate([
    (0, common_1.Get)("/get/:postIdx"),
    __param(0, (0, common_1.Param)("postIdx")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "findAllComment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "게시물 좋아요" }),
    (0, common_1.Post)("/likeComment"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_comment_dto_1.LikeCommentDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "commentLike", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "게시물 좋아요 취소" }),
    (0, common_1.Post)("/likeCancelComment"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_comment_dto_1.LikeCommentDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "commentLikeCancel", null);
CommentController = __decorate([
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    (0, swagger_1.ApiTags)("COMMENT"),
    (0, common_1.Controller)("comment"),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map