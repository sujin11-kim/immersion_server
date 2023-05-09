import { PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Post } from "mymodel/entities/Post";
import { Comment } from "mymodel/entities/Comment";

export class readonlyPostDto extends Post {
  imagePath: string[];
  commentList: Comment[];
}
