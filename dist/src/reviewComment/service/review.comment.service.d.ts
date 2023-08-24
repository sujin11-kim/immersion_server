import { CreateReviewCommentDto } from "../dto/create-review-comment.dto";
import { ReviewCommentImpl } from "../interface/review.comment.implement";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";
export declare class ReviewCommentService {
    private reviewCommentImpl;
    constructor(reviewCommentImpl: ReviewCommentImpl);
    createReviewComment(userIdx: number, createReviewCommentDto: CreateReviewCommentDto): Promise<readonlyCommentDto>;
    modifyReviewComment(userIdx: number, createReviewCommentDto: CreateReviewCommentDto): Promise<any>;
    deleteReviewComment(userIdx: number, reviewIdx: number): Promise<any>;
}
