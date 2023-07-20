import { Post } from "../../../resource/db/entities/Post";
import { Repository } from "typeorm";
import { User } from "resource/db/entities/User";
import { Comment } from "resource/db/entities/Comment";
import { readonlyCommentDto } from "../dto/readonly-comment.dto";
export declare class CustomCommentQueryRepository {
    private readonly postRepository;
    private readonly userRepository;
    private readonly commentRepository;
    constructor(postRepository: Repository<Post>, userRepository: Repository<User>, commentRepository: Repository<Comment>);
    isPostExist(postIdx: number): Promise<void>;
    findNickName(userIdx: number): Promise<string>;
    findCommentByPostIdx(postIdx: number): Promise<readonlyCommentDto[]>;
}
