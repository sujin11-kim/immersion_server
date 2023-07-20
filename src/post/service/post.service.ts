import { Injectable } from "@nestjs/common";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { readonlyPostDto } from "../dto/readonly-post.dto";
import { CreatePostDto } from "../dto/create-post.dto";
import { PostImpl } from "../interface/post.implement";

@Injectable()
export class PostService {
  constructor(private postImpl: PostImpl) {}

  // 2-1 로그인한 user로 게시물 작성
  async createPost(
    user: UserLoginDto,
    postInfo: CreatePostDto
  ): Promise<readonlyPostDto> {
    return await this.postImpl.createPost(user, postInfo);
  }

  // 2-2 로그인한 user의 게시물 조회
  async findIdPost(userIdx: number): Promise<readonlyPostDto[]> {
    return await this.postImpl.findIdPost(userIdx);
  }

  // 2-3 카테고리로 게시물 조회
  async findCategoryPost(category: string): Promise<readonlyPostDto[]> {
    return await this.postImpl.findCategoryPost(category);
  }

  // 2-4 게시물 전체 조회
  async findAll(page: number, pageSize: number): Promise<readonlyPostDto[]> {
    return await this.postImpl.findAll(page, pageSize);
  }

  // 2-5 게시물 좋아요
  async postLike(
    user: UserLoginDto,
    postIdx: number
  ): Promise<readonlyPostDto> {
    return await this.postImpl.postLike(user, postIdx);
  }

  //2-6 게시물 좋아요 취소
  async postLikeCancel(
    user: UserLoginDto,
    postIdx: number
  ): Promise<readonlyPostDto> {
    return await this.postImpl.postLikeCancel(user, postIdx);
  }
}
