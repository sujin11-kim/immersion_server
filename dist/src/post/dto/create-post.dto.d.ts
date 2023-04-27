import { Post } from "mymodel/entities/Post";
declare const CreatePostDto_base: import("@nestjs/common").Type<Pick<Post, "content" | "category" | "title">>;
export declare class CreatePostDto extends CreatePostDto_base {
}
export {};
