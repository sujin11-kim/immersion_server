import { Post } from "../../../resource/db/entities/Post";
import { Image } from "../../../resource/db/entities/Image";
import { Repository } from "typeorm";
import { PostInterface } from "./post.interface";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreatePostDto } from "../dto/create-post.dto";
import { readonlyPostDto } from "../dto/readonly-post.dto";
import { CustomPostQueryRepository } from "../repository/post-query.repository";
import { CustomPostCommandRepository } from "../repository/post-command.repository";
export declare class PostImpl implements PostInterface {
    private readonly customPostCommandRrepository;
    private readonly customPostQueryRrepository;
    private postEntityRepository;
    private imageEntityRepository;
    constructor(customPostCommandRrepository: CustomPostCommandRepository, customPostQueryRrepository: CustomPostQueryRepository, postEntityRepository: Repository<Post>, imageEntityRepository: Repository<Image>);
    createPost(user: UserLoginDto, postInfo: CreatePostDto): Promise<readonlyPostDto>;
    findAll(page: number, pageSize: number): Promise<readonlyPostDto[]>;
}
