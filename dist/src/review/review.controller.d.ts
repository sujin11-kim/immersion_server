import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { UserLoginDto } from "src/users/dto/user-login.dto";
export declare class ReviewController {
    private reveiwservice;
    constructor(reveiwservice: ReviewService);
    getAllReview(): Promise<import("../../mymodel/entities/Review").Review[]>;
    getoneReview(reviewIdx: number): Promise<import("../../mymodel/entities/Review").Review>;
    create(createReviewDto: CreateReviewDto, user: UserLoginDto): Promise<import("../../mymodel/entities/Review").Review>;
    update(reviewIdx: number, updateReviewDto: UpdateReviewDto): Promise<import("../../mymodel/entities/Review").Review>;
    delete(reviewIdx: number): Promise<import("../../mymodel/entities/Review").Review>;
}
