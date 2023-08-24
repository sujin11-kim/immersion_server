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
exports.ReviewCommentService = void 0;
const common_1 = require("@nestjs/common");
const review_comment_implement_1 = require("../interface/review.comment.implement");
let ReviewCommentService = class ReviewCommentService {
    constructor(reviewCommentImpl) {
        this.reviewCommentImpl = reviewCommentImpl;
    }
    async createReviewComment(userIdx, createReviewCommentDto) {
        return await this.reviewCommentImpl.createReviewComment(userIdx, createReviewCommentDto);
    }
    async modifyReviewComment(userIdx, createReviewCommentDto) {
        return await this.reviewCommentImpl.modifyReviewComment(userIdx, createReviewCommentDto);
    }
    async deleteReviewComment(userIdx, reviewIdx) {
        return await this.reviewCommentImpl.deleteReviewComment(userIdx, reviewIdx);
    }
};
ReviewCommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [review_comment_implement_1.ReviewCommentImpl])
], ReviewCommentService);
exports.ReviewCommentService = ReviewCommentService;
//# sourceMappingURL=review.comment.service.js.map