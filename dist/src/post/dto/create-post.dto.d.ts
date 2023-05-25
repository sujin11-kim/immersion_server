import { Post } from "mymodel/entities/Post";
declare const CreatePostDto_base: import("@nestjs/common").Type<Pick<Post, "category" | "title" | "content">>;
export declare class CreatePostDto extends CreatePostDto_base {
}
export {};
