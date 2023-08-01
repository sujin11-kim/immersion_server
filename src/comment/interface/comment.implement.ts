import { Injectable } from "@nestjs/common";
import { CommentInterface } from "./comment.interface";
import { CustomCommentCommandRepository } from "../repository/comment-command.repository";
import { CustomCommentQueryRepository } from "../repository/comment-query.repository";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";

@Injectable()
export class CommentImpl implements CommentInterface {
  constructor(
    private readonly customCommentCommandRrepository: CustomCommentCommandRepository,
    private readonly customCommentQueryRrepository: CustomCommentQueryRepository
  ) {}

  // 3-1 댓글 생성
  async createComment(
    userIdx: number,
    createCommentDto: CreateCommentDto
  ): Promise<readonlyCommentDto> {
    await this.customCommentQueryRrepository.isPostExist(
      createCommentDto.postIdx
    );
    const nickName = await this.customCommentQueryRrepository.findNickName(
      userIdx
    );
    const savedComment = await this.customCommentCommandRrepository.saveComment(
      userIdx,
      createCommentDto
    );
    return { ...savedComment, nickName };
  }

  // 3-2 게시물 id로 댓글 조회
  async findAllComment(postIdx: number): Promise<readonlyCommentDto[]> {
    await this.customCommentQueryRrepository.isPostExist(postIdx);
    return await this.customCommentQueryRrepository.findCommentByPostIdx(
      postIdx
    );
  }
}
