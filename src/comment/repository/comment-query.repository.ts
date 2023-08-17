import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../../../resource/db/entities/Post";
import { Repository } from "typeorm";
import { User } from "resource/db/entities/User";
import { Comment } from "resource/db/entities/Comment";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";
import { CustomExceptions } from "src/aop/exception/custom-exception";

@Injectable()
export class CustomCommentQueryRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  // 게시물 확인
  async isPostExist(postIdx: number) {
    const post = await this.postRepository.findOne({
      where: { postIdx: postIdx },
    });
    if (!post) {
      throw new BadRequestException(CustomExceptions.NOT_FOUNT_POST);
    }
  }

  // nickName 찾기
  async findNickName(userIdx: number) {
    const user = await this.userRepository.findOne({
      where: { userIdx: userIdx },
    });
    return user.nickName;
  }

  // 댓글 찾기 by postIdx
  async findCommentByPostIdx(postIdx: number): Promise<readonlyCommentDto[]> {
    const comments = await this.commentRepository
      .createQueryBuilder("comment")
      .innerJoinAndSelect("comment.user", "user")
      .where("comment.postIdx = :postIdx", { postIdx })
      .select([
        "comment.commentIdx",
        "comment.postIdx",
        "comment.parentCommentIdx",
        "comment.depth",
        "comment.commentAt",
        "comment.commentContent",
        "comment.isDeleted",
        "comment.userIdx",
        "user.nickName",
      ])
      .getMany();

    if (comments.length === 0) {
      throw new BadRequestException(CustomExceptions.NOT_FOUND_COMMENT);
    }

    const result: readonlyCommentDto[] = comments.map((comment) => ({
      commentIdx: comment.commentIdx,
      postIdx: comment.postIdx,
      parentCommentIdx: comment.parentCommentIdx,
      depth: comment.depth,
      commentAt: comment.commentAt,
      commentContent: comment.commentContent,
      isDeleted: comment.isDeleted,
      userIdx: comment.userIdx,
      nickName: comment.user.nickName,
    }));

    return result;
  }

  //댓글 찾기
  async commentonefind(commentIdx: number) {
    const review = await this.commentRepository.findOneBy({ commentIdx });
    return review;
  }


  //게시물 찾기
   async postonefind(postIdx: number) {
    const post = await this.postRepository.findOneBy({ postIdx });
    return post;
  }

  

}
