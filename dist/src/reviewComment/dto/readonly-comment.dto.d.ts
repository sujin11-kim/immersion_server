import { Comment } from "../../../resource/db/entities/Comment";
declare const readonlyCommentDto_base: import("@nestjs/common").Type<Pick<Comment, "postIdx" | "parentCommentIdx" | "depth" | "commentContent">>;
export declare class readonlyCommentDto extends readonlyCommentDto_base {
    nickName: string;
}
export {};
