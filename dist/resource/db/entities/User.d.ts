import { ChatUser } from "./ChatUser";
import { LikePost } from "./LikePost";
import { Restaurant } from "./Restaurant";
export declare class User {
    userIdx: number;
    email: string;
    nickName: string | null;
    phone: string | null;
    fcmtoken: string | null;
    refreshToken: string | null;
    enrollDate: Date | null;
    password: string | null;
    latitude: number | null;
    longitude: number | null;
    chatUsers: ChatUser[];
    likePost: LikePost;
    restaurants: Restaurant[];
}
