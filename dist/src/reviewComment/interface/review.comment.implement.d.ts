import { ReviewCommentInterface } from "./review.comment.interface";
import { CustomReviewCommentCommandRepository } from "../repository/review-comment-command.repository";
import { CustomReviewCommentQueryRepository } from "../repository/review-comment-query.repository";
import { CreateReviewCommentDto } from "../dto/create-review-comment.dto";
import { ErrorResponse } from "src/aop/exception/error-reponse";
export declare class ReviewCommentImpl implements ReviewCommentInterface {
    private readonly customCommandRrepository;
    private readonly customQueryRrepository;
    private errorResponse;
    constructor(customCommandRrepository: CustomReviewCommentCommandRepository, customQueryRrepository: CustomReviewCommentQueryRepository, errorResponse: ErrorResponse);
    createReviewComment(userIdx: number, createReviewCommentDto: CreateReviewCommentDto): Promise<any>;
    modifyReviewComment(userIdx: number, createReviewCommentDto: CreateReviewCommentDto): Promise<any>;
    deleteReviewComment(userIdx: number, reviewIdx: number): Promise<any>;
}
