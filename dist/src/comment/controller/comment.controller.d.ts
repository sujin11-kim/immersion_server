import { CommentService } from "../service/comment.service";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { LikeCommentDto } from "../dto/like-comment.dto";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createComment(createCommentDto: CreateCommentDto, user: UserLoginDto): Promise<import("../dto/readonly-comment.dto").readonlyCommentDto>;
    findAllComment(postIdx: number): Promise<import("../dto/readonly-comment.dto").readonlyCommentDto[]>;
    commentLike(Idx: LikeCommentDto): Promise<import("../../../resource/db/entities/Comment").Comment>;
    commentLikeCancel(Idx: LikeCommentDto): Promise<import("../../../resource/db/entities/Comment").Comment>;
}
