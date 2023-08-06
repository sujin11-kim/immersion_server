import { PickType } from "@nestjs/swagger";
import { Comment } from "../../../resource/db/entities/Comment";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto extends PickType(Comment, [
  "postIdx",
  "parentCommentIdx",
  "depth",
  "commentContent",
]) {
  @IsNotEmpty()
  postIdx: number;

  @IsNotEmpty()
  @IsString()
  commentContent: string;

  parentCommentIdx: number;

  depth: number;
}
