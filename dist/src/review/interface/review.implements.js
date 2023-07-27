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
exports.ReviewtIml = void 0;
const common_1 = require("@nestjs/common");
const review_command_repository_1 = require("../repository/review-command.repository");
const review_query_repository_1 = require("../repository/review-query.repository");
let ReviewtIml = class ReviewtIml {
    constructor(customReviewCommandRepository, customReviewQueryRepository) {
        this.customReviewCommandRepository = customReviewCommandRepository;
        this.customReviewQueryRepository = customReviewQueryRepository;
    }
    async getAllReview() {
        return await this.customReviewQueryRepository.reviewfind();
    }
    async getoneReview(reviewIdx) {
        return this.customReviewQueryRepository.reviewonefind(reviewIdx);
    }
    async create(user, createReviewDto) {
        return this.customReviewCommandRepository.create(user, createReviewDto);
    }
    async update(reviewIdx, updateReviewDto) {
        return this.customReviewCommandRepository.update(reviewIdx, updateReviewDto);
    }
    async delete(reviewIdx) {
        return this.customReviewCommandRepository.delete(reviewIdx);
    }
};
ReviewtIml = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [review_command_repository_1.CustomReviewCommandRepository,
        review_query_repository_1.CustomReviewQueryRepository])
], ReviewtIml);
exports.ReviewtIml = ReviewtIml;
//# sourceMappingURL=review.implements.js.map