import { Post } from "../../../resource/db/entities/Post";
import { Repository } from "typeorm";
import { CreatePostDto } from "../dto/create-post.dto";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { readonlyPostDto } from "../dto/readonly-post.dto";
import { ErrorResponse } from "src/aop/exception/error-reponse";
export declare class CustomPostCommandRepository {
    private readonly postRepository;
    private errorResponse;
    constructor(postRepository: Repository<Post>, errorResponse: ErrorResponse);
    savePost(postInfo: CreatePostDto, user: UserLoginDto): Promise<readonlyPostDto>;
    increaseLikeNum(editPost: Post, user: UserLoginDto): Promise<Post>;
    decreaseLikeNum(editPost: Post, user: UserLoginDto): Promise<Post>;
}
