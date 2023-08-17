import { Injectable } from "@nestjs/common";
import { CreateReviewDto } from "../dto/create-review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { ReviewtIml } from "../interface/review.implements";

@Injectable()
export class ReviewService {
  constructor(private reviewImpl: ReviewtIml) {}

  async getAllReview() {
    return await this.reviewImpl.getAllReview();
  }

  async getoneReview(reviewIdx: number) {
    return await this.reviewImpl.getoneReview(reviewIdx);
  }
  async createReview(user: UserLoginDto, createReviewDto: CreateReviewDto) {
    console.log("service");
    return await this.reviewImpl.createReview(user, createReviewDto);
  }
  async updateReview(reviewIdx: number, updateReviewDto: UpdateReviewDto) {
    return await this.reviewImpl.updateReview(reviewIdx, updateReviewDto);
  }

  async deleteReview(reviewIdx: number) {
    return this.reviewImpl.deleteReview(reviewIdx);
  }
}
