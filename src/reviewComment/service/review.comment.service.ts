import { Injectable } from "@nestjs/common";
import { CreateReviewCommentDto } from "../dto/create-review-comment.dto";
import { ReviewCommentImpl } from "../interface/review.comment.implement";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";

@Injectable()
export class ReviewCommentService {
  constructor(private reviewCommentImpl: ReviewCommentImpl) {}

  // 리뷰 댓글 생성
  async createReviewComment(
    userIdx: number,
    createReviewCommentDto: CreateReviewCommentDto
  ): Promise<readonlyCommentDto> {
    return await this.reviewCommentImpl.createReviewComment(
      userIdx,
      createReviewCommentDto
    );
  }

  // 리뷰 댓글 수정
  async modifyReviewComment(
    userIdx: number,
    createReviewCommentDto: CreateReviewCommentDto
  ) {
    return await this.reviewCommentImpl.modifyReviewComment(
      userIdx,
      createReviewCommentDto
    );
  }

  //3-4 댓글 좋아요 취소
  async deleteReviewComment(userIdx: number, reviewIdx: number) {
    return await this.reviewCommentImpl.deleteReviewComment(userIdx, reviewIdx);
  }
}
