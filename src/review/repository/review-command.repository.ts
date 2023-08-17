//creat,update,delete            save 관련
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { Review } from "resource/db/entities/Review";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreateReviewDto } from "../dto/create-review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";

@Injectable()
export class CustomReviewCommandRepository {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async createReview(
    user: UserLoginDto,
    createReviewDto: CreateReviewDto
  ): Promise<Review> {
    
    const queryRunner =
      this.reviewRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const review = queryRunner.manager.getRepository(Review).create();
      (review.userIdx = user.userIdx),
        (review.postIdx = createReviewDto.postIdx),
        (review.restaurantIdx = createReviewDto.restaurantIdx),
        (review.content = createReviewDto.content),
        (review.score = createReviewDto.score);
      await queryRunner.manager.getRepository(Review).save(review);

      await queryRunner.commitTransaction();
      return review;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    
  }

  async updateReview(
    reviewIdx: number,
    updateReviewDto: UpdateReviewDto
  ): Promise<Review> {
    const queryRunner =
      this.reviewRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const review = await queryRunner.manager
        .getRepository(Review)
        .findOne({ where: { reviewIdx } });

      const { content, score } = updateReviewDto;

      review.content = content;
      review.score = score;

      await queryRunner.manager.getRepository(Review).save(review);
      await queryRunner.commitTransaction();

      return review;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(reviewIdx: number): Promise<Review> {
    const queryRunner =
      this.reviewRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const review = await queryRunner.manager
        .getRepository(Review)
        .findOne({ where: { reviewIdx } });

      await queryRunner.manager.getRepository(Review).delete(reviewIdx);
      return review;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
