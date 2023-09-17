import { Post } from "../../../resource/db/entities/Post";
import { Repository } from "typeorm";
import { User } from "resource/db/entities/User";
import { Comment } from "resource/db/entities/Comment";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";
import { ErrorResponse } from "src/aop/exception/error-reponse";
export declare class CustomCommentQueryRepository {
    private readonly postRepository;
    private readonly userRepository;
    private readonly commentRepository;
    private errorResponse;
    constructor(postRepository: Repository<Post>, userRepository: Repository<User>, commentRepository: Repository<Comment>, errorResponse: ErrorResponse);
    isPostExist(postIdx: number): Promise<void>;
    findNickName(userIdx: number): Promise<string>;
    findCommentByPostIdx(postIdx: number): Promise<readonlyCommentDto[]>;
    commentonefind(commentIdx: number): Promise<Comment>;
    postonefind(postIdx: number): Promise<Post>;
}
