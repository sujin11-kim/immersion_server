import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreateReviewDto } from "../dto/create-review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";
import { Review } from "resource/db/entities/Review";
export interface ReviewInterface {
  //6-1 모든 리뷰 조회
  getAllReview(): Promise<Review[]>;

  //6-2특정리뷰 조회
  getoneReview(reviewIdx: number): Promise<Review>;

  //6-3리뷰 작성
  createReview(
    user: UserLoginDto,
    createReviewDto: CreateReviewDto
  ): Promise<any>;

  //6-4 특정리뷰 수정
  updateReview(
    reviewIdx: number,
    updateReviewDto: UpdateReviewDto
  ): Promise<any>;

  // 6-5특정 리뷰 삭제
  deleteReview(reviewIdx: number): Promise<Review>;
}
