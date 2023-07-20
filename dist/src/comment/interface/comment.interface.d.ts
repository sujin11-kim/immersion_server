import { CreateCommentDto } from "../dto/create-comment.dto";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";
export interface CommentInterface {
    createComment(userIdx: number, createCommentDto: CreateCommentDto): Promise<readonlyCommentDto>;
    findAllComment(postIdx: number): Promise<readonlyCommentDto[]>;
}
