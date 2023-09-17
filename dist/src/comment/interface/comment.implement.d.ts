import { CommentInterface } from "./comment.interface";
import { CustomCommentCommandRepository } from "../repository/comment-command.repository";
import { CustomCommentQueryRepository } from "../repository/comment-query.repository";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";
import { ErrorResponse } from "src/aop/exception/error-reponse";
export declare class CommentImpl implements CommentInterface {
    private readonly customCommentCommandRrepository;
    private readonly customCommentQueryRrepository;
    private errorResponse;
    constructor(customCommentCommandRrepository: CustomCommentCommandRepository, customCommentQueryRrepository: CustomCommentQueryRepository, errorResponse: ErrorResponse);
    createComment(userIdx: number, createCommentDto: CreateCommentDto): Promise<readonlyCommentDto>;
    findAllComment(postIdx: number): Promise<readonlyCommentDto[]>;
    commentLike(userIdx: number, postIdx: number, commentIdx: number): Promise<import("../../../resource/db/entities/Comment").Comment>;
    commentLikeCancel(userIdx: number, postIdx: number, commentIdx: number): Promise<import("../../../resource/db/entities/Comment").Comment>;
}
