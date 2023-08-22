import { CreateReviewCommentDto } from "../dto/create-review-comment.dto";
export interface ReviewCommentInterface {
    createReviewComment(userIdx: number, createReviewCommentDto: CreateReviewCommentDto): Promise<any>;
    modifyReviewComment(userIdx: number, createReviewCommentDto: CreateReviewCommentDto): Promise<any>;
    deleteReviewComment(userIdx: number, reviewIdx: number): Promise<any>;
}
