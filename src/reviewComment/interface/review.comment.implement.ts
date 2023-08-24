import { Injectable } from "@nestjs/common";
import { ReviewCommentInterface } from "./review.comment.interface";
import { CustomReviewCommentCommandRepository } from "../repository/review-comment-command.repository";
import { CustomReviewCommentQueryRepository } from "../repository/review-comment-query.repository";
import { CreateReviewCommentDto } from "../dto/create-review-comment.dto";
import { ErrorResponse } from "src/aop/exception/error-reponse";

@Injectable()
export class ReviewCommentImpl implements ReviewCommentInterface {
  constructor(
    private readonly customCommandRrepository: CustomReviewCommentCommandRepository,
    private readonly customQueryRrepository: CustomReviewCommentQueryRepository,
    private errorResponse: ErrorResponse
  ) {}

  // 리뷰 댓글 생성
  async createReviewComment(
    userIdx: number,
    createReviewCommentDto: CreateReviewCommentDto
  ): Promise<any> {
    const errorResult = {
      reviewIdx: null,
      content: "",
      commentIdx: null,
      createdAt: "",
      updatedAt: "",
    };
    // 리뷰 존재 확인
    const review = await this.customQueryRrepository.isReviewExist(
      createReviewCommentDto.reviewIdx
    );
    if (!review) {
      throw this.errorResponse.notFoundReview();
    }

    // 리뷰 댓글 존재 확인
    const comment = await this.customQueryRrepository.isCommentExist(
      createReviewCommentDto.reviewIdx
    );
    if (comment) {
      throw this.errorResponse.alreadyExistingCommentError();
    }

    // 리뷰가 속하는 가게의 사장이 접근하려는 건지 확인
    if (review.userIdx !== userIdx) {
      throw this.errorResponse.onlyOwnerCanAccess(errorResult);
    }

    return await this.customCommandRrepository.createReviewComment(
      createReviewCommentDto
    );
  }

  // 리뷰 댓글 수정
  async modifyReviewComment(
    userIdx: number,
    createReviewCommentDto: CreateReviewCommentDto
  ): Promise<any> {
    const errorResult = {
      reviewIdx: null,
      content: "",
      commentIdx: null,
      createdAt: "",
      updatedAt: "",
    };

    // 리뷰 댓글 존재 확인
    const comment = await this.customQueryRrepository.isCommentExist(
      createReviewCommentDto.reviewIdx
    );
    if (!comment) {
      throw this.errorResponse.notFoundReviewComment(errorResult);
    }

    // 리뷰가 속하는 가게의 사장이 본인 댓글을 수정하려는 건지 확인
    const review = await this.customQueryRrepository.isReviewExist(
      createReviewCommentDto.reviewIdx
    );
    if (review.userIdx !== userIdx) {
      throw this.errorResponse.onlyOwnerCanAccess(errorResult);
    }

    return await this.customCommandRrepository.modifyReviewComment(
      comment,
      createReviewCommentDto
    );
  }

  // 리뷰 댓글 삭제

  async deleteReviewComment(userIdx: number, reviewIdx: number): Promise<any> {
    // 리뷰 댓글 존재 확인
    const comment = await this.customQueryRrepository.isCommentExist(reviewIdx);
    if (!comment) {
      throw this.errorResponse.notFoundReviewComment({ commentIdx: null });
    }

    // 리뷰가 속하는 가게의 사장이 접근하려는 건지 확인
    const review = await this.customQueryRrepository.isReviewExist(reviewIdx);
    if (review.userIdx !== userIdx) {
      throw this.errorResponse.onlyOwnerCanAccess({ commentIdx: null });
    }

    const commentIdx = comment.commentIdx;
    await this.customCommandRrepository.deleteReviewComment(comment);
    return { commentIdx };
  }
}
