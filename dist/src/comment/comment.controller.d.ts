import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { LikeCommentDto } from "./dto/like-comment.dto";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    findAllComment(postIdx: number): Promise<import("../../resource/db/entities/Comment").Comment[]>;
    createComment(createCommentDto: CreateCommentDto, user: UserLoginDto): Promise<{
        nickName: string;
        commentIdx: number;
        postIdx: number;
        userIdx: number;
        parentCommentIdx: number;
        depth: number;
        commentAt: string;
        commentContent: string;
        isDeleted: boolean;
        likeNum: number;
        postIdx2: import("../../resource/db/entities/Post").Post;
        likeComments: import("../../resource/db/entities/LikeComment").LikeComment[];
    }>;
    modifyComment(createCommentDto: CreateCommentDto): Promise<void>;
    removeComment(commentIdx: string): Promise<void>;
    commentLike(Idx: LikeCommentDto): Promise<import("../../resource/db/entities/Comment").Comment>;
    commentLikeCancel(Idx: LikeCommentDto): Promise<import("../../resource/db/entities/Comment").Comment>;
}
