import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../../../resource/db/entities/Post";
import { Image } from "../../../resource/db/entities/Image";
import { Repository } from "typeorm";
import { PostInterface } from "./post.interface";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreatePostDto } from "../dto/create-post.dto";
import { readonlyPostDto } from "../dto/readonly-post.dto";
import { CustomPostQueryRepository } from "../repository/post-query.repository";
import { CustomPostCommandRepository } from "../repository/post-command.repository";

@Injectable()
export class PostImpl implements PostInterface {
  constructor(
    private readonly customPostCommandRrepository: CustomPostCommandRepository,
    private readonly customPostQueryRrepository: CustomPostQueryRepository,
    @InjectRepository(Post)
    private postEntityRepository: Repository<Post>,
    @InjectRepository(Image)
    private imageEntityRepository: Repository<Image>
  ) {}

  //2-1 로그인한 user로 게시물 작성
  async createPost(
    user: UserLoginDto,
    postInfo: CreatePostDto
  ): Promise<readonlyPostDto> {
    // 이모지 제거
    postInfo.content = postInfo.content.replace(/[\u{1F600}-\u{1F6FF}]/gu, "");
    // 게시물 저장 및 반환
    return await this.customPostCommandRrepository.savePost(postInfo, user);
  }

  // 2-2 로그인한 user의 게시물 조회
  async findIdPost(userIdx: number): Promise<readonlyPostDto[]> {
    const posts = await this.customPostQueryRrepository.findPostsById(userIdx);
    return await this.customPostQueryRrepository.getPostWithImageComment(posts);
  }

  // 2-3 카테고리로 게시물 조회
  async findCategoryPost(category: string): Promise<readonlyPostDto[]> {
    const posts = await this.customPostQueryRrepository.findPostsByCategory(
      category
    );
    return await this.customPostQueryRrepository.getPostWithImageComment(posts);
  }

  // 2-4 게시물 전체 조회
  async findAll(page: number, pageSize: number): Promise<readonlyPostDto[]> {
    // 조회하려는 게시물 수가 전체 개시물 수 초과하는지 확인
    await this.customPostQueryRrepository.checkTotalPostCountExceeded(
      page,
      pageSize
    );
    // offset부터 pageSize 만큼 게시물 조회
    const offset = (page - 1) * pageSize;
    const posts = await this.customPostQueryRrepository.findPosts(
      offset,
      pageSize
    );
    // 게시물에 해당하는 이미지, 댓글 가져오기
    const postWithImageComment =
      await this.customPostQueryRrepository.getPostWithImageComment(posts);

    return postWithImageComment;
  }

  // 2-5 게시물 좋아요
  async postLike(
    user: UserLoginDto,
    postIdx: number
  ): Promise<readonlyPostDto> {
    const post = await this.customPostQueryRrepository.findPostByPostIdx(
      postIdx
    );
    const editpost = await this.customPostCommandRrepository.increaseLikeNum(
      post,
      user
    );
    const result =
      await this.customPostQueryRrepository.getPostWithImageComment([editpost]);

    return result[0];
  }

  //2-6 게시물 좋아요 취소
  async postLikeCancel(
    user: UserLoginDto,
    postIdx: number
  ): Promise<readonlyPostDto> {
    const post = await this.customPostQueryRrepository.findPostByPostIdx(
      postIdx
    );
    await this.customPostQueryRrepository.checkUserLikedPost(
      post,
      user.userIdx
    );
    const editpost = await this.customPostCommandRrepository.decreaseLikeNum(
      post,
      user
    );
    const result =
      await this.customPostQueryRrepository.getPostWithImageComment([editpost]);
    return result[0];
  }
}
