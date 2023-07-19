import { PickType } from "@nestjs/swagger";
import { Post } from "../../../resource/db/entities/Post";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto extends PickType(Post, [
  "title",
  "content",
  "category",
]) {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  image: string[];
}
