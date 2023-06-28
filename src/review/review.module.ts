import { Module } from "@nestjs/common";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "mymodel/entities/Review";
import { AuthModule } from "src/auth/auth.module";
import { User } from "mymodel/entities/User";
import { Post } from "mymodel/entities/Post";

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Post]), AuthModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
