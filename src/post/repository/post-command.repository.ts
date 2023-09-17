import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../../../resource/db/entities/Post";
import { Repository } from "typeorm";
import { Image } from "resource/db/entities/Image";
import { CreatePostDto } from "../dto/create-post.dto";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { readonlyPostDto } from "../dto/readonly-post.dto";
import { LikePost } from "resource/db/entities/LikePost";
import { ErrorResponse } from "src/aop/exception/error-reponse";

@Injectable()
export class CustomPostCommandRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private errorResponse: ErrorResponse
  ) {}

  // 게시물 정보 저장
  async savePost(
    postInfo: CreatePostDto,
    user: UserLoginDto
  ): Promise<readonlyPostDto> {
    const queryRunner =
      this.postRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const post = queryRunner.manager.getRepository(Post).create();
      post.userIdx = user.userIdx;
      post.category = postInfo.category;
      post.title = postInfo.title;
      post.content = postInfo.content;

      // 공백 제거 후 글자수 제한
      const maxContentLength = 1;
      const contentWithoutSpace = post.content.replace(/\s/g, "");
      if (contentWithoutSpace.length > maxContentLength) {
        this.errorResponse.exceedContentLength();
      }

      const savedPost = await queryRunner.manager
        .getRepository(Post)
        .save(post);

      const imagePromises = postInfo.image.map(async (imagePath) => {
        const image = queryRunner.manager.getRepository(Image).create();
        image.postIdx = savedPost.postIdx;
        image.path = imagePath;
        await queryRunner.manager.getRepository(Image).save(image);
      });

      await Promise.all(imagePromises);

      await queryRunner.commitTransaction();
      return {
        ...savedPost,
        nickName: user.nickName,
        imagePath: postInfo.image,
        commentList: [],
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // 좋아요 수 증가 & 좋아요 테이블에 추가
  async increaseLikeNum(editPost: Post, user: UserLoginDto): Promise<Post> {
    const queryRunner =
      this.postRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      editPost.likeNum += 1;
      const likeEditPost = await queryRunner.manager.save(editPost);

      const likePost = queryRunner.manager.getRepository(LikePost).create();
      likePost.postIdx = editPost.postIdx;
      likePost.userIdx = user.userIdx;
      await queryRunner.manager.getRepository(LikePost).save(likePost);

      await queryRunner.commitTransaction();
      return likeEditPost;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // 좋아요 수 감소 & 좋아요 테이블에서 제거
  async decreaseLikeNum(editPost: Post, user: UserLoginDto): Promise<Post> {
    const queryRunner =
      this.postRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      editPost.likeNum -= 1;
      const likeEditPost = await queryRunner.manager.save(editPost);

      await queryRunner.manager
        .getRepository(LikePost)
        .delete({ userIdx: user.userIdx });

      await queryRunner.commitTransaction();
      return likeEditPost;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
