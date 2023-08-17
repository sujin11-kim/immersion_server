import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentController } from "./controller/comment.controller";
import { CommentService } from "./service/comment.service";
import { Comment } from "resource/db/entities/Comment";
import { User } from "resource/db/entities/User";
import { Post } from "resource/db/entities/Post";
import { LikeComment } from "resource/db/entities/LikeComment";
import { CustomCommentCommandRepository } from "./repository/comment-command.repository";
import { CustomCommentQueryRepository } from "./repository/comment-query.repository";
import { CommentImpl } from "./interface/comment.implement";
import { ErrorResponse } from "src/aop/exception/error-reponse";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post, LikeComment])],
  controllers: [CommentController],
  providers: [
    CommentService,
    CustomCommentCommandRepository,
    CustomCommentQueryRepository,
    CommentImpl,
    ErrorResponse

  ],
})
export class CommentModule {}
