import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "mymodel/entities/Post";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { Image } from "mymodel/entities/Image";
import { AwsService } from "src/aws.service";
import { User } from "mymodel/entities/User";
import { Comment } from "mymodel/entities/Comment";
import { LikePost } from "mymodel/entities/LikePost";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Image, User, Comment, LikePost])],
  controllers: [PostController],
  providers: [PostService, AwsService],
})
export class PostModule {}
