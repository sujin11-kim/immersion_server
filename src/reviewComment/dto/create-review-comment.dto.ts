import { PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ReviewComment } from "resource/db/entities/ReviewComment";

export class CreateReviewCommentDto extends PickType(ReviewComment, [
  "reviewIdx",
  "content",
]) {
  @IsNotEmpty()
  reviewIdx: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
