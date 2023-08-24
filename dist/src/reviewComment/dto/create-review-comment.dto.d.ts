import { ReviewComment } from "resource/db/entities/ReviewComment";
declare const CreateReviewCommentDto_base: import("@nestjs/common").Type<Pick<ReviewComment, "content" | "reviewIdx">>;
export declare class CreateReviewCommentDto extends CreateReviewCommentDto_base {
    reviewIdx: number;
    content: string;
}
export {};
