import { Post } from "./Post";
import { LikeComment } from "./LikeComment";
export declare class Comment {
    commentIdx: number;
    postIdx: number;
    userIdx: number;
    parentCommentIdx: number | null;
    depth: number | null;
    commentAt: string;
    commentContent: string | null;
    isDeleted: boolean | null;
    likeNum: number | null;
    postIdx2: Post;
    likeComments: LikeComment[];
}
