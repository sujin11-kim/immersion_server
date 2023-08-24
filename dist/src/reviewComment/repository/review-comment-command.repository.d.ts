import { Repository } from "typeorm";
import { CreateReviewCommentDto } from "../dto/create-review-comment.dto";
import { ReviewComment } from "resource/db/entities/ReviewComment";
export declare class CustomReviewCommentCommandRepository {
    private readonly reviewCommentRepository;
    constructor(reviewCommentRepository: Repository<ReviewComment>);
    createReviewComment(createReviewCommentDto: CreateReviewCommentDto): Promise<ReviewComment>;
    modifyReviewComment(comment: ReviewComment, createReviewCommentDto: CreateReviewCommentDto): Promise<ReviewComment>;
    deleteReviewComment(comment: ReviewComment): Promise<ReviewComment>;
}
