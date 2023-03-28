import { Post } from "./Post";
export declare class Comment {
    commentIdx: number;
    postIdx: number;
    commnetWriter: string | null;
    commentAt: Date | null;
    commentContent: string | null;
    postIdx2: Post;
}
