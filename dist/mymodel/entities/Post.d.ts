import { Comment } from "./Comment";
import { LikePost } from "./LikePost";
export declare class Post {
    postIdx: number;
    userIdx: number;
    category: string | null;
    title: string | null;
    content: string | null;
    createdAt: string;
    updatedAt: string;
    likeNum: number | null;
    viewNum: number | null;
    comments: Comment[];
    likePosts: LikePost[];
}
