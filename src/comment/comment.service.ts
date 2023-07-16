import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource, QueryRunner } from "typeorm";
import { Comment } from "../../resource/db/entities/Comment";
import { User } from "../../resource/db/entities/User";
import { Post } from "../../resource/db/entities/Post";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { LikeComment } from "../../resource/db/entities/LikeComment";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(LikeComment)
    private readonly likeCommentRepository: Repository<LikeComment>,

    private dataSource: DataSource
  ) {}

  async findAllComment(postIdx: number): Promise<Comment[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      return await this.commentRepository.find({ where: { postIdx } });
    } finally {
      await queryRunner.release();
    }
  }

  async createComment(
    PostIdx: number,
    CommentWriterIdx: number,
    parentCommentIdx: number,
    depth: number,
    commentContent: string
  ) {
    // 객체 타입 선언 : Promise
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const post = await this.postRepository.findOne({
        where: { postIdx: PostIdx },
      });
      if (!post) {
        throw new HttpException(
          { message: "존재하지 않는 게시물 입니다." },
          201
        );
      }

      const user = await this.userRepository.findOne({
        where: { userIdx: CommentWriterIdx },
      });
      const nickName = user.nickName;

      const comment = new Comment();
      comment.postIdx = PostIdx;
      comment.parentCommentIdx = parentCommentIdx;
      comment.userIdx = CommentWriterIdx;
      comment.commentContent = commentContent;
      comment.depth = depth;

      const savedComment = await queryRunner.manager.save(comment);

      await queryRunner.commitTransaction();
      return { ...savedComment, nickName: user.nickName };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async modifyComment(PostIdx: number, commentContent: string) {}

  async removeComment(commentIdx: string) {}
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async postLike(userIdx: number, postIdx: number, commentIdx: number) {
    const queryRunner =
      this.postRepository.manager.connection.createQueryRunner();
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

      return {
        isSuccess: true,
        code: 1000,
        //kr_curr,
        result: editcomment,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async postLikeCancel(userIdx: number, postIdx: number, commentIdx: number) {
    const queryRunner =
      this.postRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const editcomment = await queryRunner.manager
        .getRepository(Comment)
        .findOne({ where: { commentIdx } });

      editcomment.likeNum -= 1;
      await queryRunner.manager.getRepository(Comment).save(editcomment);

      return {
        isSuccess: true,
        code: 1000,
        //kr_curr,
        result: editcomment,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
