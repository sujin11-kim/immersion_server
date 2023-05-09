import { Comment } from "./Comment";
import { LikePost } from "./LikePost";
export declare class Post {
    postIdx: number;
    writeIdx: number | null;
    category: string | null;
    title: string | null;
    content: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    likeNum: number | null;
    viewNum: number | null;
    nickName: string | null;
    comments: Comment[];
    likePosts: LikePost[];
}
