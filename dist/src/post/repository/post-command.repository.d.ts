import { Post } from "../../../resource/db/entities/Post";
import { Repository } from "typeorm";
import { User } from "resource/db/entities/User";
import { Image } from "resource/db/entities/Image";
import { CreatePostDto } from "../dto/create-post.dto";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { readonlyPostDto } from "../dto/readonly-post.dto";
export declare class CustomPostCommandRepository {
    private readonly postRepository;
    private readonly userRepository;
    private readonly imageRepository;
    constructor(postRepository: Repository<Post>, userRepository: Repository<User>, imageRepository: Repository<Image>);
    savePost(postInfo: CreatePostDto, user: UserLoginDto): Promise<readonlyPostDto>;
}
