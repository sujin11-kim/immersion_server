import { Post } from "mymodel/entities/Post";
import { Comment } from "mymodel/entities/Comment";
export declare class readonlyPostDto extends Post {
    imagePath: string[];
    commentList: Comment[];
}
