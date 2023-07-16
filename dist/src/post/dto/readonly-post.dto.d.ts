import { Post } from "../../../resource/db/entities/Post";
import { Comment } from "../../../resource/db/entities/Comment";
export declare class readonlyPostDto extends Post {
    nickName: string;
    imagePath: string[];
    commentList: Comment[];
}
