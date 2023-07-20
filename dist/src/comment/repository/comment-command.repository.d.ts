import { Post } from "../../../resource/db/entities/Post";
import { Repository } from "typeorm";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { Comment } from "resource/db/entities/Comment";
export declare class CustomCommentCommandRepository {
    private readonly postRepository;
    constructor(postRepository: Repository<Post>);
    saveComment(userIdx: number, createCommentDto: CreateCommentDto): Promise<Comment>;
}
