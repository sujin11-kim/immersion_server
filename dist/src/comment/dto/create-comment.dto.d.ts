import { Comment } from "../../../resource/db/entities/Comment";
declare const CreateCommentDto_base: import("@nestjs/common").Type<Pick<Comment, "postIdx" | "parentCommentIdx" | "depth" | "commentContent">>;
export declare class CreateCommentDto extends CreateCommentDto_base {
    postIdx: number;
    commentContent: string;
    parentCommentIdx: number;
    depth: number;
}
export {};
