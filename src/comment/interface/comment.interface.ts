import { Comment } from "resource/db/entities/Comment";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";

export interface CommentInterface {
  // 3-1 댓글 생성
  createComment(
    userIdx: number,
    createCommentDto: CreateCommentDto
  ): Promise<readonlyCommentDto>;

  findAllComment(postIdx: number): Promise<readonlyCommentDto[]>;


    //3-3 댓글 좋아요
    commentLike(userIdx: number, postIdx: number, commentIdx: number): Promise<Comment>;
    //3-4 댓글 좋아요 취소
    commentLikeCancel(userIdx: number, postIdx: number, commentIdx: number): Promise<Comment>;

}
