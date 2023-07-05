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
exports.ReviewService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const Review_1 = require("../../mymodel/entities/Review");
const typeorm_2 = require("typeorm");
const Post_1 = require("../../mymodel/entities/Post");
const User_1 = require("../../mymodel/entities/User");
let ReviewService = class ReviewService {
    constructor(reviewRepostitory, postRepository, userRepository, dataSource) {
        this.reviewRepostitory = reviewRepostitory;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.dataSource = dataSource;
    }
    async create(user, createReviewDto) {
        const queryRunner = this.postRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const review = queryRunner.manager.getRepository(Review_1.Review).create();
            (review.userIdx = user.userIdx),
                (review.postIdx = createReviewDto.postIdx),
                (review.restaurantIdx = createReviewDto.restaurantIdx),
                (review.content = createReviewDto.content),
                (review.score = createReviewDto.score);
            await queryRunner.manager.getRepository(Review_1.Review).save(review);
            await queryRunner.commitTransaction();
            return review;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getAllReview() {
        return await this.reviewRepostitory.find();
    }
    async getoneReview(reviewIdx) {
        const review = await this.reviewRepostitory.findOneBy({ reviewIdx });
        if (!review) {
            throw new common_1.NotFoundException(`Review with ID ${reviewIdx} not found`);
        }
        return review;
    }
    async update(reviewIdx, updateReviewDto) {
        const queryRunner = this.postRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const review = await queryRunner.manager
                .getRepository(Review_1.Review)
                .findOne({ where: { reviewIdx } });
            const { content, score } = updateReviewDto;
            review.content = content;
            review.score = score;
            await queryRunner.manager.getRepository(Review_1.Review).save(review);
            await queryRunner.commitTransaction();
            return review;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async delete(reviewIdx) {
        const queryRunner = this.postRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const review = await queryRunner.manager
                .getRepository(Review_1.Review)
                .findOne({ where: { reviewIdx } });
            if (!review) {
                throw new common_1.NotFoundException(`Review with ID ${reviewIdx} not found`);
            }
            console.log("11111111111111111111111");
            await queryRunner.manager.getRepository(Review_1.Review).delete(reviewIdx);
            console.log("212222222222222222");
            return review;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
};
ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Review_1.Review)),
    __param(1, (0, typeorm_1.InjectRepository)(Post_1.Post)),
    __param(2, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map