import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../../../resource/db/entities/Post";
import { Repository } from "typeorm";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { Comment } from "resource/db/entities/Comment";
import { LikeComment } from "resource/db/entities/LikeComment";

@Injectable()
export class CustomCommentCommandRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
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


async increaseLikeNUm(  userIdx: number,postIdx: number,commentIdx:number){

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


async decreaseLikeNUm( userIdx: number,postIdx: number,commentIdx:number){

  const queryRunner =
  this.commentRepository.manager.connection.createQueryRunner();
await queryRunner.connect();
await queryRunner.startTransaction();

try {
  const editcomment = await queryRunner.manager
    .getRepository(Comment)
    .findOne({ where: { commentIdx } });

  editcomment.likeNum -= 1;
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


}
