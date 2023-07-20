import { CreateCommentDto } from "../dto/create-comment.dto";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";

export interface CommentInterface {
  // 3-1 댓글 생성
  createComment(
    userIdx: number,
    createCommentDto: CreateCommentDto
  ): Promise<readonlyCommentDto>;

  findAllComment(postIdx: number): Promise<readonlyCommentDto[]>;
}
