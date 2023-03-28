/// <reference types="node" />
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
    image: Buffer | null;
    fileName: string | null;
    likeNum: number | null;
    viewNum: number | null;
    comments: Comment[];
    likePosts: LikePost[];
}
