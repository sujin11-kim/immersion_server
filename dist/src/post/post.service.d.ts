import { Repository, DataSource } from "typeorm";
import { Post } from "../../mymodel/entities/Post";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { Image } from "mymodel/entities/Image";
import { readonlyPostDto } from "./dto/readonly-post.dto";
import * as multerS3 from "multer-s3";
import { AwsService } from "src/aws.service";
import { User } from "mymodel/entities/User";
import { Comment } from "mymodel/entities/Comment";
import { LikePost } from "mymodel/entities/LikePost";
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
    findIdPost(id: number): Promise<readonlyPostDto[]>;
    findCategoryPost(category: string): Promise<readonlyPostDto[]>;
    postLike(user: UserLoginDto, postIdx: number): Promise<readonlyPostDto>;
    postLikeCancel(user: UserLoginDto, postIdx: number): Promise<readonlyPostDto>;
}
