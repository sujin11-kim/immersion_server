import { ReviewImage } from "./ReviewImage";
import { ReviewComment } from "./ReviewComment";
export declare class Review {
    reviewIdx: number;
    userIdx: number;
    postIdx: number;
    restaurantIdx: number;
    content: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    score: number | null;
    Images: ReviewImage[];
    comment: ReviewComment;
}
