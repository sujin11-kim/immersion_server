import { Post } from "../../../resource/db/entities/Post";
declare const CreatePostDto_base: import("@nestjs/common").Type<Pick<Post, "content" | "category" | "title">>;
export declare class CreatePostDto extends CreatePostDto_base {
    title: string;
    content: string;
    category: string;
    image: string[];
}
export {};
