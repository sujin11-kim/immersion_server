import { Repository } from "typeorm";
import { Review } from "resource/db/entities/Review";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreateReviewDto } from "../dto/create-review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";
export declare class CustomReviewCommandRepository {
    private readonly reviewRepository;
    constructor(reviewRepository: Repository<Review>);
    createReview(user: UserLoginDto, createReviewDto: CreateReviewDto): Promise<any>;
    updateReview(reviewIdx: number, updateReviewDto: UpdateReviewDto): Promise<any>;
    delete(reviewIdx: number): Promise<Review>;
}
