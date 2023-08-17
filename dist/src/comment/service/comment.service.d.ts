import { Repository, DataSource } from "typeorm";
import { Comment } from "../../../resource/db/entities/Comment";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { CommentImpl } from "../interface/comment.implement";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";
export declare class CommentService {
    private readonly commentRepository;
    private dataSource;
    private commentImpl;
    constructor(commentRepository: Repository<Comment>, dataSource: DataSource, commentImpl: CommentImpl);
    createComment(userIdx: number, createCommentDto: CreateCommentDto): Promise<readonlyCommentDto>;
    findAllComment(postIdx: number): Promise<readonlyCommentDto[]>;
    commentLike(userIdx: number, postIdx: number, commentIdx: number): Promise<Comment>;
    commentLikeCancel(userIdx: number, postIdx: number, commentIdx: number): Promise<Comment>;
}
