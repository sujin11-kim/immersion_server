import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../../resource/db/entities/Post";
import { PostController } from "./controller/post.controller";
import { PostService } from "./service/post.service";
import { Image } from "../../resource/db/entities/Image";
import { AwsService } from "src/aop/utils/aws.service";
import { User } from "../../resource/db/entities/User";
import { Comment } from "../../resource/db/entities/Comment";
import { LikePost } from "../../resource/db/entities/LikePost";
import { PostImpl } from "./interface/post.implement";
import { CustomPostCommandRepository } from "./repository/post-command.repository";
import { CustomPostQueryRepository } from "./repository/post-query.repository";
import { ErrorResponse } from "src/aop/exception/error-reponse";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Image, User, Comment, LikePost])],
  controllers: [PostController],
  providers: [
    PostService,
    AwsService,
    PostImpl,
    CustomPostCommandRepository,
    CustomPostQueryRepository,
    ErrorResponse,
  ],
})
export class PostModule {}
