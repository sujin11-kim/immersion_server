import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource, QueryRunner } from "typeorm";
import { Comment } from "../../../resource/db/entities/Comment";
import { User } from "../../../resource/db/entities/User";
import { LikeComment } from "../../../resource/db/entities/LikeComment";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { CommentImpl } from "../interface/comment.implement";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private dataSource: DataSource,
    private commentImpl: CommentImpl
  ) {}

  // 3-1 댓글 생성
  async createComment(
    userIdx: number,
    createCommentDto: CreateCommentDto
  ): Promise<readonlyCommentDto> {
    return await this.commentImpl.createComment(userIdx, createCommentDto);
  }

  // 3-2 게시물 id로 댓글 조회
  async findAllComment(postIdx: number): Promise<readonlyCommentDto[]> {
    return await this.commentImpl.findAllComment(postIdx);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async commentLike(userIdx: number, postIdx: number, commentIdx: number) {
    const queryRunner =
      this.commentRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const editcomment = await queryRunner.manager
        .getRepository(Comment)
        .findOne({ where: { commentIdx } });

      editcomment.likeNum += 1;
      await queryRunner.manager.getRepository(Comment).save(editcomment);

      const likeComment = new LikeComment();
      likeComment.commentIdx = commentIdx;
      likeComment.userIdx = userIdx;
      likeComment.postIdx = postIdx;
      await queryRunner.manager.getRepository(LikeComment).save(likeComment);

      return editcomment;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async postLikeCancel(userIdx: number, postIdx: number, commentIdx: number) {
    const queryRunner =
      this.commentRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const editcomment = await queryRunner.manager
        .getRepository(Comment)
        .findOne({ where: { commentIdx } });

      if (editcomment.likeNum > 0) {
        editcomment.likeNum -= 1;
      }

      await queryRunner.manager.getRepository(Comment).save(editcomment);

      return editcomment;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
