import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { Comment } from "resource/db/entities/Comment";
import { UsersModule } from "src/users/users.module";
import { User } from "resource/db/entities/User";
import { Post } from "resource/db/entities/Post";
import { LikeComment } from "resource/db/entities/LikeComment";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post, LikeComment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
