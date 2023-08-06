import { Injectable } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { ReviewtIml } from "./interface/review.implements";

@Injectable()
export class ReviewService {
  constructor(private reviewImpl: ReviewtIml) {}

  async getAllReview() {
    return await this.reviewImpl.getAllReview();
  }

  async getoneReview(reviewIdx: number) {
    return await this.reviewImpl.getoneReview(reviewIdx);
  }
  async create(user: UserLoginDto, createReviewDto: CreateReviewDto) {
    console.log("service");
    return await this.reviewImpl.create(user, createReviewDto);
  }
  async update(reviewIdx: number, updateReviewDto: UpdateReviewDto) {
    return await this.reviewImpl.update(reviewIdx, updateReviewDto);
  }

  async delete(reviewIdx: number) {
    return this.reviewImpl.delete(reviewIdx);
  }
}
