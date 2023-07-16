import { Repository, DataSource } from "typeorm";
import { Comment } from "../../resource/db/entities/Comment";
import { User } from "../../resource/db/entities/User";
import { Post } from "../../resource/db/entities/Post";
import { LikeComment } from "../../resource/db/entities/LikeComment";
export declare class CommentService {
    private readonly commentRepository;
    private readonly userRepository;
    private readonly postRepository;
    private readonly likeCommentRepository;
    private dataSource;
    constructor(commentRepository: Repository<Comment>, userRepository: Repository<User>, postRepository: Repository<Post>, likeCommentRepository: Repository<LikeComment>, dataSource: DataSource);
    findAllComment(postIdx: number): Promise<Comment[]>;
    createComment(PostIdx: number, CommentWriterIdx: number, parentCommentIdx: number, depth: number, commentContent: string): Promise<{
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
        postIdx2: Post;
        likeComments: LikeComment[];
    }>;
    modifyComment(PostIdx: number, commentContent: string): Promise<void>;
    removeComment(commentIdx: string): Promise<void>;
    postLike(userIdx: number, postIdx: number, commentIdx: number): Promise<{
        isSuccess: boolean;
        code: number;
        result: Comment;
    }>;
    postLikeCancel(userIdx: number, postIdx: number, commentIdx: number): Promise<{
        isSuccess: boolean;
        code: number;
        result: Comment;
    }>;
}
