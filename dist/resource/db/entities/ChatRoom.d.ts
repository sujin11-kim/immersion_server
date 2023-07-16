import { Message } from "./Message";
export declare class ChatRoom {
    roomIdx: number;
    roomName: string | null;
    isSentPush: boolean | null;
    isLoginUser: boolean | null;
    newMessageCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    messages: Message[];
}
