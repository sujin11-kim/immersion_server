import { Repository, DataSource } from "typeorm";
import { Comment } from "../../mymodel/entities/Comment";
import { User } from "mymodel/entities/User";
import { Post } from "mymodel/entities/Post";
export declare class CommentService {
    private readonly commentRepository;
    private readonly userRepository;
    private readonly postRepository;
    private dataSource;
    constructor(commentRepository: Repository<Comment>, userRepository: Repository<User>, postRepository: Repository<Post>, dataSource: DataSource);
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
        postIdx2: Post;
    }>;
    modifyComment(PostIdx: number, commentContent: string): Promise<void>;
    removeComment(commentIdx: string): Promise<void>;
}
