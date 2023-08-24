import { ReviewCommentService } from "../service/review.comment.service";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreateReviewCommentDto } from "../dto/create-review-comment.dto";
export declare class ReviewCommentController {
    private readonly reviewCommentService;
    constructor(reviewCommentService: ReviewCommentService);
    createReviewComment(createReviewCommentDto: CreateReviewCommentDto, user: UserLoginDto): Promise<import("../dto/readonly-comment.dto").readonlyCommentDto>;
    modifyReviewComment(createReviewCommentDto: CreateReviewCommentDto, user: UserLoginDto): Promise<any>;
    deleteReviewComment(reviewIdx: number, user: UserLoginDto): Promise<any>;
}
