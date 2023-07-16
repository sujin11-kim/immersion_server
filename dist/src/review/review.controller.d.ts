import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { UserLoginDto } from "src/users/dto/user-login.dto";
export declare class ReviewController {
    private reveiwservice;
    constructor(reveiwservice: ReviewService);
    getAllReview(): Promise<import("../../resource/db/entities/Review").Review[]>;
    getoneReview(reviewIdx: number): Promise<import("../../resource/db/entities/Review").Review>;
    create(createReviewDto: CreateReviewDto, user: UserLoginDto): Promise<import("../../resource/db/entities/Review").Review>;
    update(reviewIdx: number, updateReviewDto: UpdateReviewDto): Promise<import("../../resource/db/entities/Review").Review>;
    delete(reviewIdx: number): Promise<import("../../resource/db/entities/Review").Review>;
}
