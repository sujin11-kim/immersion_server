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
exports.CustomReviewCommentQueryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const error_reponse_1 = require("../../aop/exception/error-reponse");
const Review_1 = require("../../../resource/db/entities/Review");
const Restaurant_1 = require("../../../resource/db/entities/Restaurant");
const ReviewComment_1 = require("../../../resource/db/entities/ReviewComment");
let CustomReviewCommentQueryRepository = class CustomReviewCommentQueryRepository {
    constructor(reviewRepository, restaurantRepository, reviewCommentRepository, errorResponse) {
        this.reviewRepository = reviewRepository;
        this.restaurantRepository = restaurantRepository;
        this.reviewCommentRepository = reviewCommentRepository;
        this.errorResponse = errorResponse;
    }
    async isReviewExist(reviewIdx) {
        return await this.reviewRepository.findOne({
            where: { reviewIdx },
        });
    }
    async isCommentExist(reviewIdx) {
        return await this.reviewCommentRepository.findOne({
            where: { reviewIdx },
        });
    }
};
CustomReviewCommentQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Review_1.Review)),
    __param(1, (0, typeorm_1.InjectRepository)(Restaurant_1.Restaurant)),
    __param(2, (0, typeorm_1.InjectRepository)(ReviewComment_1.ReviewComment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        error_reponse_1.ErrorResponse])
], CustomReviewCommentQueryRepository);
exports.CustomReviewCommentQueryRepository = CustomReviewCommentQueryRepository;
//# sourceMappingURL=review-comment-query.repository.js.map