import { Module } from "@nestjs/common";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "../../resource/db/entities/Review";
import { AuthModule } from "src/auth/auth.module";
import { User } from "../../resource/db/entities/User";
import { Post } from "../../resource/db/entities/Post";

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Post]), AuthModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
