import { CreateReviewCommentDto } from "../dto/create-review-comment.dto";

export interface ReviewCommentInterface {
  // 리뷰 댓글 생성
  createReviewComment(
    userIdx: number,
    createReviewCommentDto: CreateReviewCommentDto
  ): Promise<any>;

  // 리뷰 댓글 수정
  modifyReviewComment(
    userIdx: number,
    createReviewCommentDto: CreateReviewCommentDto
  ): Promise<any>;

  // 리뷰 댓글 삭제
  deleteReviewComment(userIdx: number, reviewIdx: number): Promise<any>;
}
