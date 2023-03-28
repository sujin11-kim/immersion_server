import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAll(): Promise<import("../../mymodel/entities/Post").Post[]>;
    findOne(writeIdx: number): Promise<import("../../mymodel/entities/Post").Post>;
    create(createPostDto: CreatePostDto): Promise<import("../../mymodel/entities/Post").Post>;
}
