import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreateReviewDto } from "../dto/create-review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";
import { Review } from "resource/db/entities/Review";
export interface ReviewInterface {
    create(user: UserLoginDto, createReviewDto: CreateReviewDto): Promise<Review>;
    getAllReview(): Promise<Review[]>;
    getoneReview(reviewIdx: number): Promise<Review>;
    update(reviewIdx: number, updateReviewDto: UpdateReviewDto): Promise<Review>;
    delete(reviewIdx: number): Promise<Review>;
}
