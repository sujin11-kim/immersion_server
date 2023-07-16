import { Repository, DataSource } from "typeorm";
import { Post } from "../../../resource/db/entities/Post";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { Image } from "../../../resource/db/entities/Image";
import { readonlyPostDto } from "../dto/readonly-post.dto";
import * as multerS3 from "multer-s3";
import { AwsService } from "src/aop/utils/aws.service";
import { User } from "../../../resource/db/entities/User";
import { Comment } from "../../../resource/db/entities/Comment";
import { LikePost } from "../../../resource/db/entities/LikePost";
export declare class PostService {
    private readonly postRepository;
    private readonly imageRepository;
    private readonly userRepository;
    private readonly likePostRepository;
    private readonly commentRepository;
    private readonly awsService;
    private dataSource;
    constructor(postRepository: Repository<Post>, imageRepository: Repository<Image>, userRepository: Repository<User>, likePostRepository: Repository<LikePost>, commentRepository: Repository<Comment>, awsService: AwsService, dataSource: DataSource);
    createPost(user: UserLoginDto, category: string, title: string, content: string, files: multerS3.File[]): Promise<readonlyPostDto>;
    findAll(page: number, pageSize: number): Promise<readonlyPostDto[]>;
    findIdPost(userIdx: number): Promise<readonlyPostDto[]>;
    findCategoryPost(category: string): Promise<readonlyPostDto[]>;
    postLike(user: UserLoginDto, postIdx: number): Promise<readonlyPostDto>;
    postLikeCancel(user: UserLoginDto, postIdx: number): Promise<readonlyPostDto>;
    validateContent(content: string): string;
}
