import { Injectable } from "@nestjs/common";
import { ReviewInterface } from "./review.interface";
import { User } from "resource/db/entities/User";
import { Post } from "resource/db/entities/Post";
import { Review } from "resource/db/entities/Review";
import { CreateReviewDto } from "../dto/create-review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";
import { CustomReviewCommandRepository } from "../repository/review-command.repository";
import { CustomReviewQueryRepository } from "../repository/review-query.repository";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ReviewtIml implements ReviewInterface {
  constructor(
    private readonly customReviewCommandRepository: CustomReviewCommandRepository,
    private readonly customReviewQueryRepository: CustomReviewQueryRepository
  ) {}

  //6-1 모든 리뷰 조회
  async getAllReview(): Promise<Review[]> {
    return await this.customReviewQueryRepository.reviewfind();
  }

  //6-2특정리뷰 조회
  async getoneReview(reviewIdx: number): Promise<Review> {
    return this.customReviewQueryRepository.reviewonefind(reviewIdx);
  }

  //6-3리뷰 작성
  async create(
    user: UserLoginDto,
    createReviewDto: CreateReviewDto
  ): Promise<Review> {
    return this.customReviewCommandRepository.create(user, createReviewDto);
  }

  //6-4 특정리뷰 수정
  async update(
    reviewIdx: number,
    updateReviewDto: UpdateReviewDto
  ): Promise<Review> {
    return this.customReviewCommandRepository.update(
      reviewIdx,
      updateReviewDto
    );
  }

  // 6-5특정 리뷰 삭제
  async delete(reviewIdx: number): Promise<Review> {
    return this.customReviewCommandRepository.delete(reviewIdx);
  }
}
