import { CommentInterface } from "./comment.interface";
import { CustomCommentCommandRepository } from "../repository/comment-command.repository";
import { CustomCommentQueryRepository } from "../repository/comment-query.repository";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";
export declare class CommentImpl implements CommentInterface {
    private readonly customCommentCommandRrepository;
    private readonly customCommentQueryRrepository;
    constructor(customCommentCommandRrepository: CustomCommentCommandRepository, customCommentQueryRrepository: CustomCommentQueryRepository);
    createComment(userIdx: number, createCommentDto: CreateCommentDto): Promise<readonlyCommentDto>;
    findAllComment(postIdx: number): Promise<readonlyCommentDto[]>;
}
