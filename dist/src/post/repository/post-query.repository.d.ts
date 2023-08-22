import { Post } from "../../../resource/db/entities/Post";
import { Repository } from "typeorm";
import { User } from "resource/db/entities/User";
import { Image } from "resource/db/entities/Image";
import { Comment } from "resource/db/entities/Comment";
import { readonlyPostDto } from "../dto/readonly-post.dto";
import { LikePost } from "resource/db/entities/LikePost";
import { ErrorResponse } from "src/aop/exception/error-reponse";
export declare class CustomPostQueryRepository {
    private readonly postRepository;
    private readonly userRepository;
    private readonly imageRepository;
    private readonly commentRepository;
    private readonly likePostRepository;
    private errorResponse;
    constructor(postRepository: Repository<Post>, userRepository: Repository<User>, imageRepository: Repository<Image>, commentRepository: Repository<Comment>, likePostRepository: Repository<LikePost>, errorResponse: ErrorResponse);
    findPostsById(userIdx: number): Promise<Post[]>;
    findPostsByCategory(category: string): Promise<Post[]>;
    checkTotalPostCountExceeded(page: number, pageSize: number): Promise<void>;
    findPosts(offset: number, pageSize: number): Promise<Post[]>;
    getPostWithImageComment(posts: Post[]): Promise<readonlyPostDto[]>;
    findPostByPostIdx(postIdx: number): Promise<Post | undefined>;
    checkUserLikedPost(post: Post, userIdx: number): Promise<void>;
}
