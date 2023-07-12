/// <reference types="multer" />
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UserLoginDto } from "src/users/dto/user-login.dto";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAll(page: number, pageSize: number): Promise<import("./dto/readonly-post.dto").readonlyPostDto[]>;
    findIdPost(user: UserLoginDto): Promise<import("./dto/readonly-post.dto").readonlyPostDto[]>;
    findCategoryPost(category: string): Promise<import("./dto/readonly-post.dto").readonlyPostDto[]>;
    create(createPostDto: CreatePostDto, files: Express.Multer.File[], user: UserLoginDto): Promise<import("./dto/readonly-post.dto").readonlyPostDto>;
    postLike(postIdx: number, user: UserLoginDto): Promise<import("./dto/readonly-post.dto").readonlyPostDto>;
    postLikeCancel(postIdx: number, user: UserLoginDto): Promise<import("./dto/readonly-post.dto").readonlyPostDto>;
}
