import { Post } from "./Post";
export declare class Comment {
    commentIdx: number;
    postIdx: number;
    CommentWriter: string | null;
    parentCommentIdx: number | null;
    depth: number | null;
    commentAt: Date | null;
    commentContent: string | null;
    isDeleted: boolean | null;
    writeIdx: number | null;
    postIdx2: Post;
}
