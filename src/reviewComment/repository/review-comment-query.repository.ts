import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { Review } from "resource/db/entities/Review";
import { Restaurant } from "resource/db/entities/Restaurant";
import { ReviewComment } from "resource/db/entities/ReviewComment";

@Injectable()
export class CustomReviewCommentQueryRepository {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(ReviewComment)
    private readonly reviewCommentRepository: Repository<ReviewComment>,
    private errorResponse: ErrorResponse
  ) {}

  // 리뷰 존재 확인
  async isReviewExist(reviewIdx: number) {
    return await this.reviewRepository.findOne({
      where: { reviewIdx },
    });
  }

  // 댓글 존재 확인
  async isCommentExist(reviewIdx: number) {
    return await this.reviewCommentRepository.findOne({
      where: { reviewIdx },
    });
  }
}
