import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreateReviewDto } from "../dto/create-review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";
import { Review } from "resource/db/entities/Review";
export interface ReviewInterface {
    getAllReview(): Promise<Review[]>;
    getoneReview(reviewIdx: number): Promise<Review>;
    createReview(user: UserLoginDto, createReviewDto: CreateReviewDto): Promise<Review>;
    updateReview(reviewIdx: number, updateReviewDto: UpdateReviewDto): Promise<Review>;
    deleteReview(reviewIdx: number): Promise<Review>;
}
