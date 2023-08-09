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
exports.CustomReviewQueryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Review_1 = require("../../../resource/db/entities/Review");
const Post_1 = require("../../../resource/db/entities/Post");
let CustomReviewQueryRepository = class CustomReviewQueryRepository {
    constructor(reviewRepository, postRepository) {
        this.reviewRepository = reviewRepository;
        this.postRepository = postRepository;
    }
    async reviewfind() {
        return await this.reviewRepository.find();
    }
    async reviewonefind(reviewIdx) {
        const review = await this.reviewRepository.findOneBy({ reviewIdx });
        return review;
    }
    async postonefind(postIdx) {
        const review = await this.postRepository.findOneBy({ postIdx });
        return review;
    }
};
CustomReviewQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Review_1.Review)),
    __param(1, (0, typeorm_1.InjectRepository)(Post_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CustomReviewQueryRepository);
exports.CustomReviewQueryRepository = CustomReviewQueryRepository;
//# sourceMappingURL=review-query.repository.js.map