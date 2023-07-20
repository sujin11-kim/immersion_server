import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../../../resource/db/entities/Post";
import { Repository } from "typeorm";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { Comment } from "resource/db/entities/Comment";

@Injectable()
export class CustomCommentCommandRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  // 댓글 저장
  async saveComment(
    userIdx: number,
    createCommentDto: CreateCommentDto
  ): Promise<Comment> {
    const queryRunner =
      this.postRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const comment = queryRunner.manager.getRepository(Comment).create();
      comment.postIdx = createCommentDto.postIdx;
      comment.parentCommentIdx = createCommentDto.parentCommentIdx;
      comment.userIdx = userIdx;
      comment.commentContent = createCommentDto.commentContent;
      comment.depth = createCommentDto.depth;

      const savedComment = await queryRunner.manager
        .getRepository(Comment)
        .save(comment);

      await queryRunner.commitTransaction();
      return savedComment;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
