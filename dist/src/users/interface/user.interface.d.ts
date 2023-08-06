import { CreateUserDto } from "../dto/create-user.dto";
export interface UserInterface {
    createUser(userInfo: CreateUserDto): Promise<{
        userIdx: string;
    }>;
    getAllFCM(): Promise<Record<"fcmTokens", object>>;
    getFCMByUserIdx(userIdx: number): Promise<Record<"fcmToken", string>>;
}
