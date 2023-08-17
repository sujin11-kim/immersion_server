import { Comment } from "resource/db/entities/Comment";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";
export interface CommentInterface {
    createComment(userIdx: number, createCommentDto: CreateCommentDto): Promise<readonlyCommentDto>;
    findAllComment(postIdx: number): Promise<readonlyCommentDto[]>;
    commentLike(userIdx: number, postIdx: number, commentIdx: number): Promise<Comment>;
    commentLikeCancel(userIdx: number, postIdx: number, commentIdx: number): Promise<Comment>;
}
