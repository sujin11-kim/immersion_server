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
exports.ReviewCommentController = void 0;
const common_1 = require("@nestjs/common");
const review_comment_service_1 = require("../service/review.comment.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../auth/utils/jwt/jwt.guard");
const success_interceptor_1 = require("../../../src/aop/interceptors/success.interceptor");
const http_exception_filter_1 = require("../../../src/aop/exception/http-exception.filter");
const user_decorator_1 = require("../../../src/aop/decorators/user.decorator");
const user_login_dto_1 = require("../../users/dto/user-login.dto");
const create_review_comment_dto_1 = require("../dto/create-review-comment.dto");
let ReviewCommentController = class ReviewCommentController {
    constructor(reviewCommentService) {
        this.reviewCommentService = reviewCommentService;
    }
    createReviewComment(createReviewCommentDto, user) {
        return this.reviewCommentService.createReviewComment(user.userIdx, createReviewCommentDto);
    }
    modifyReviewComment(createReviewCommentDto, user) {
        return this.reviewCommentService.modifyReviewComment(user.userIdx, createReviewCommentDto);
    }
    deleteReviewComment(reviewIdx, user) {
        return this.reviewCommentService.deleteReviewComment(user.userIdx, reviewIdx);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "리뷰 댓글 생성" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_comment_dto_1.CreateReviewCommentDto,
        user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], ReviewCommentController.prototype, "createReviewComment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "리뷰 댓글 수정" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("/modify"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_comment_dto_1.CreateReviewCommentDto,
        user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], ReviewCommentController.prototype, "modifyReviewComment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "리뷰 댓글 삭제" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)("/delete/:reviewIdx"),
    __param(0, (0, common_1.Param)("reviewIdx")),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], ReviewCommentController.prototype, "deleteReviewComment", null);
ReviewCommentController = __decorate([
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    (0, swagger_1.ApiTags)("REVEIW_COMMENT"),
    (0, common_1.Controller)("review/comment"),
    __metadata("design:paramtypes", [review_comment_service_1.ReviewCommentService])
], ReviewCommentController);
exports.ReviewCommentController = ReviewCommentController;
//# sourceMappingURL=review.comment.controller.js.map