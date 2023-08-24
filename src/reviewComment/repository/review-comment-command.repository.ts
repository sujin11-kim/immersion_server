import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateReviewCommentDto } from "../dto/create-review-comment.dto";
import { ReviewComment } from "resource/db/entities/ReviewComment";

@Injectable()
export class CustomReviewCommentCommandRepository {
  constructor(
    @InjectRepository(ReviewComment)
    private readonly reviewCommentRepository: Repository<ReviewComment>
  ) {}

  // 리뷰 댓글 저장
  async createReviewComment(createReviewCommentDto: CreateReviewCommentDto) {
    const reviewComment = this.reviewCommentRepository.create({
      reviewIdx: createReviewCommentDto.reviewIdx,
      content: createReviewCommentDto.content,
    });

    return this.reviewCommentRepository.save(reviewComment);
  }

  // 리뷰 댓글 수정
  async modifyReviewComment(
    comment: ReviewComment,
    createReviewCommentDto: CreateReviewCommentDto
  ) {
    // 리뷰 댓글 엔티티의 content 업데이트
    comment.content = createReviewCommentDto.content;
    // 수정된 리뷰 댓글 엔티티 저장
    return this.reviewCommentRepository.save(comment);
  }

  // 리뷰 댓글 수정
  async deleteReviewComment(comment: ReviewComment) {
    // 수정된 리뷰 댓글 엔티티 저장
    return this.reviewCommentRepository.remove(comment);
  }
}
