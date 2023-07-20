import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreatePostDto } from "../dto/create-post.dto";
import { readonlyPostDto } from "../dto/readonly-post.dto";

export interface PostInterface {
  // 2-1 로그인한 user로 게시물 작성
  createPost(
    user: UserLoginDto,
    postInfo: CreatePostDto
  ): Promise<readonlyPostDto>;

  // 2-2 로그인한 user의 게시물 조회
  findIdPost(userIdx: number): Promise<readonlyPostDto[]>;

  // 2-3 카테고리로 게시물 조회
  findCategoryPost(category: string): Promise<readonlyPostDto[]>;

  // 2-4 게시물 전체 조회
  findAll(page: number, pageSize: number): Promise<readonlyPostDto[]>;

  // 2-5 게시물 좋아요
  postLike(user: UserLoginDto, postIdx: number): Promise<readonlyPostDto>;

  //2-6 게시물 좋아요 취소
  postLikeCancel(user: UserLoginDto, postIdx: number): Promise<readonlyPostDto>;
}
