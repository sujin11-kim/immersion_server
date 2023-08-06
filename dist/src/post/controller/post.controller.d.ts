import { PostService } from "../service/post.service";
import { CreatePostDto } from "../dto/create-post.dto";
import { UserLoginDto } from "../../users/dto/user-login.dto";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto, user: UserLoginDto): Promise<import("../dto/readonly-post.dto").readonlyPostDto>;
    findIdPost(user: UserLoginDto): Promise<import("../dto/readonly-post.dto").readonlyPostDto[]>;
    findCategoryPost(category: string): Promise<import("../dto/readonly-post.dto").readonlyPostDto[]>;
    findAll(page: number, pageSize: number): Promise<import("../dto/readonly-post.dto").readonlyPostDto[]>;
    postLike(postIdx: number, user: UserLoginDto): Promise<import("../dto/readonly-post.dto").readonlyPostDto>;
    postLikeCancel(postIdx: number, user: UserLoginDto): Promise<import("../dto/readonly-post.dto").readonlyPostDto>;
}
