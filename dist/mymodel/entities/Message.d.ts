import { ChatRoom } from "./ChatRoom";
import { ChatUser } from "./ChatUser";
export declare class Message {
    messageIdx: number;
    chatUserIdx: number;
    roomIdx: number;
    content: string | null;
    createdAt: Date | null;
    roomIdx2: ChatRoom;
    chatUserIdx2: ChatUser;
}
