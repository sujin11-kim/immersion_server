import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { Comment } from "mymodel/entities/Comment";
import { UsersModule } from "src/users/users.module";
import { User } from "mymodel/entities/User";
import { Post } from "mymodel/entities/Post";
import { LikeComment } from "mymodel/entities/LikeComment";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post,LikeComment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
