import { ReviewService } from "../service/review.service";
import { CreateReviewDto } from "../dto/create-review.dto";
import { UpdateReviewDto } from "../dto/update-review.dto";
import { UserLoginDto } from "src/users/dto/user-login.dto";
export declare class ReviewController {
    private reveiwservice;
    constructor(reveiwservice: ReviewService);
    getAllReview(): Promise<import("../../../resource/db/entities/Review").Review[]>;
    getoneReview(reviewIdx: number): Promise<import("../../../resource/db/entities/Review").Review>;
    createReview(createReviewDto: CreateReviewDto, user: UserLoginDto): Promise<any>;
    updateReview(reviewIdx: number, updateReviewDto: UpdateReviewDto): Promise<any>;
    deleteReview(reviewIdx: number): Promise<import("../../../resource/db/entities/Review").Review>;
}
