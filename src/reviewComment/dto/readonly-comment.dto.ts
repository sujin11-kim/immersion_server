import { PickType } from "@nestjs/swagger";
import { Comment } from "../../../resource/db/entities/Comment";

export class readonlyCommentDto extends PickType(Comment, [
  "postIdx",
  "parentCommentIdx",
  "depth",
  "commentContent",
]) {
  nickName: string;
}
