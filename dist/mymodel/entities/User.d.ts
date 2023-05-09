import { ChatUser } from "./ChatUser";
import { LikePost } from "./LikePost";
export declare class User {
    userIdx: number;
    id: number;
    nickName: string | null;
    phone: string | null;
    enrollDate: Date | null;
    password: string | null;
    chatUsers: ChatUser[];
    likePost: LikePost;
}
