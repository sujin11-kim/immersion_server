import { UserLoginDto } from "src/users/dto/user-login.dto";
import { CreatePostDto } from "../dto/create-post.dto";
import { readonlyPostDto } from "../dto/readonly-post.dto";
export interface PostInterface {
    createPost(user: UserLoginDto, postInfo: CreatePostDto): Promise<readonlyPostDto>;
    findAll(page: number, pageSize: number): Promise<readonlyPostDto[]>;
}
