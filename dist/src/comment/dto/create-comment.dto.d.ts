export declare class CreateCommentDto {
    readonly postIdx: number;
    readonly parentCommentIdx: number | null;
    readonly depth: number | null;
    readonly commentContent: string | null;
}
