import { CreateReviewDto } from "../dto/create-review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { ReviewtIml } from "../interface/review.implements";
export declare class ReviewService {
    private reviewImpl;
    constructor(reviewImpl: ReviewtIml);
    getAllReview(): Promise<import("../../../resource/db/entities/Review").Review[]>;
    getoneReview(reviewIdx: number): Promise<import("../../../resource/db/entities/Review").Review>;
    createReview(user: UserLoginDto, createReviewDto: CreateReviewDto): Promise<any>;
    updateReview(reviewIdx: number, updateReviewDto: UpdateReviewDto): Promise<any>;
    deleteReview(reviewIdx: number): Promise<import("../../../resource/db/entities/Review").Review>;
}
