import { Post } from "../../../resource/db/entities/Post";
import { Repository } from "typeorm";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { Comment } from "resource/db/entities/Comment";
export declare class CustomCommentCommandRepository {
    private readonly postRepository;
    private readonly commentRepository;
    constructor(postRepository: Repository<Post>, commentRepository: Repository<Comment>);
    saveComment(userIdx: number, createCommentDto: CreateCommentDto): Promise<Comment>;
    increaseLikeNUm(userIdx: number, postIdx: number, commentIdx: number): Promise<Comment>;
    decreaseLikeNUm(userIdx: number, postIdx: number, commentIdx: number): Promise<Comment>;
}
