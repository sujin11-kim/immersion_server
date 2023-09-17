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
exports.ReviewCommentImpl = void 0;
const common_1 = require("@nestjs/common");
const review_comment_command_repository_1 = require("../repository/review-comment-command.repository");
const review_comment_query_repository_1 = require("../repository/review-comment-query.repository");
const error_reponse_1 = require("../../aop/exception/error-reponse");
let ReviewCommentImpl = class ReviewCommentImpl {
    constructor(customCommandRrepository, customQueryRrepository, errorResponse) {
        this.customCommandRrepository = customCommandRrepository;
        this.customQueryRrepository = customQueryRrepository;
        this.errorResponse = errorResponse;
    }
    async createReviewComment(userIdx, createReviewCommentDto) {
        const errorResult = {
            reviewIdx: null,
            content: "",
            commentIdx: null,
            createdAt: "",
            updatedAt: "",
        };
        const review = await this.customQueryRrepository.isReviewExist(createReviewCommentDto.reviewIdx);
        if (!review) {
            throw this.errorResponse.notFoundReview();
        }
        const comment = await this.customQueryRrepository.isCommentExist(createReviewCommentDto.reviewIdx);
        if (comment) {
            throw this.errorResponse.alreadyExistingCommentError();
        }
        if (review.userIdx !== userIdx) {
            throw this.errorResponse.onlyOwnerCanAccess(errorResult);
        }
        return await this.customCommandRrepository.createReviewComment(createReviewCommentDto);
    }
    async modifyReviewComment(userIdx, createReviewCommentDto) {
        const errorResult = {
            reviewIdx: null,
            content: "",
            commentIdx: null,
            createdAt: "",
            updatedAt: "",
        };
        const comment = await this.customQueryRrepository.isCommentExist(createReviewCommentDto.reviewIdx);
        if (!comment) {
            throw this.errorResponse.notFoundReviewComment(errorResult);
        }
        const review = await this.customQueryRrepository.isReviewExist(createReviewCommentDto.reviewIdx);
        if (review.userIdx !== userIdx) {
            throw this.errorResponse.onlyOwnerCanAccess(errorResult);
        }
        return await this.customCommandRrepository.modifyReviewComment(comment, createReviewCommentDto);
    }
    async deleteReviewComment(userIdx, reviewIdx) {
        const comment = await this.customQueryRrepository.isCommentExist(reviewIdx);
        if (!comment) {
            throw this.errorResponse.notFoundReviewComment({ commentIdx: null });
        }
        const review = await this.customQueryRrepository.isReviewExist(reviewIdx);
        if (review.userIdx !== userIdx) {
            throw this.errorResponse.onlyOwnerCanAccess({ commentIdx: null });
        }
        const commentIdx = comment.commentIdx;
        await this.customCommandRrepository.deleteReviewComment(comment);
        return { commentIdx };
    }
};
ReviewCommentImpl = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [review_comment_command_repository_1.CustomReviewCommentCommandRepository,
        review_comment_query_repository_1.CustomReviewCommentQueryRepository,
        error_reponse_1.ErrorResponse])
], ReviewCommentImpl);
exports.ReviewCommentImpl = ReviewCommentImpl;
//# sourceMappingURL=review.comment.implement.js.map