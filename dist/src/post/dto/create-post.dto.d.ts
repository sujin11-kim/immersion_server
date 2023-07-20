import { Post } from "../../../resource/db/entities/Post";
declare const CreatePostDto_base: import("@nestjs/common").Type<Pick<Post, "category" | "title" | "content">>;
export declare class CreatePostDto extends CreatePostDto_base {
    title: string;
    content: string;
    category: string;
    image: string[];
}
export {};
