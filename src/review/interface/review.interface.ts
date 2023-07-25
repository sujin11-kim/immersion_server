import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreateReviewDto } from "../dto/create-review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";
import { Review } from "resource/db/entities/Review";

export interface ReviewInterface {
  //6-1 모든 리뷰 조회
  create(user: UserLoginDto, createReviewDto: CreateReviewDto): Promise<Review>;

  //6-2특정리뷰 조회
  getAllReview(): Promise<Review[]>;

  //6-3리뷰 작성
  getoneReview(reviewIdx: number): Promise<Review>;

  //6-4 특정리뷰 수정
  update(reviewIdx: number, updateReviewDto: UpdateReviewDto): Promise<Review>;

  // 6-5특정 리뷰 삭제
  delete(reviewIdx: number): Promise<Review>;
}
