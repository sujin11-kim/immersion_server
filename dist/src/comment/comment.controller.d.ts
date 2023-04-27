import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UserLoginDto } from "src/users/dto/user-login.dto";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    findAllComment(postIdx: number): Promise<import("../../mymodel/entities/Comment").Comment[]>;
    createComment(createCommentDto: CreateCommentDto, user: UserLoginDto): Promise<import("../../mymodel/entities/Comment").Comment>;
    modifyComment(createCommentDto: CreateCommentDto): Promise<void>;
    removeComment(commentIdx: string): Promise<void>;
}
