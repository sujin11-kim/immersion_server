import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreatePostDto } from "../dto/create-post.dto";
import { readonlyPostDto } from "../dto/readonly-post.dto";

export interface PostInterface {
  // 2-1 로그인한 user로 게시물 작성
  createPost(
    user: UserLoginDto,
    postInfo: CreatePostDto
  ): Promise<readonlyPostDto>;
  // 2-4 게시물 전체 조회
  findAll(page: number, pageSize: number): Promise<readonlyPostDto[]>;
}
