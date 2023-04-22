import { PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Post } from "mymodel/entities/Post";

export class readonlyPostDto extends Post {
  imagePath: string[];
}
