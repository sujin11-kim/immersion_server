import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource, QueryRunner } from "typeorm";
import { Comment } from "../../mymodel/entities/Comment";
import { Image } from "mymodel/entities/Image";
import { User } from "mymodel/entities/User";
import { Post } from "mymodel/entities/Post";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
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
  ): Promise<Comment> {
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
        where: { id: CommentWriterIdx },
      });
      const nickName = user.nickName;

      const comment = new Comment();
      comment.postIdx = PostIdx;
      comment.CommentWriter = nickName;
      comment.parentCommentIdx = parentCommentIdx;
      comment.writeIdx = CommentWriterIdx;
      comment.commentContent = commentContent;
      comment.depth = depth;

      const savedComment = await queryRunner.manager.save(comment);

      await queryRunner.commitTransaction();
      return savedComment;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async modifyComment(PostIdx: number, commentContent: string) {}

  async removeComment(commentIdx: string) {}
}
