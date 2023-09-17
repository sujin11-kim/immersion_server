import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewCommentController } from "./controller/review.comment.controller";
import { ReviewCommentService } from "./service/review.comment.service";
import { CustomReviewCommentCommandRepository } from "./repository/review-comment-command.repository";
import { CustomReviewCommentQueryRepository } from "./repository/review-comment-query.repository";
import { ReviewCommentImpl } from "./interface/review.comment.implement";
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { ReviewComment } from "resource/db/entities/ReviewComment";
import { Review } from "resource/db/entities/Review";
import { Restaurant } from "resource/db/entities/Restaurant";

@Module({
  imports: [TypeOrmModule.forFeature([ReviewComment, Review, Restaurant])],
  controllers: [ReviewCommentController],
  providers: [
    ReviewCommentService,
    CustomReviewCommentCommandRepository,
    CustomReviewCommentQueryRepository,
    ReviewCommentImpl,
    ErrorResponse,
  ],
})
export class ReviewCommentModule {}
