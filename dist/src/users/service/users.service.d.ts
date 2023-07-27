import { CreateUserDto } from "../dto/create-user.dto";
import { UserImpl } from "../interface/user.implement";
export declare class UsersService {
    private userImpl;
    constructor(userImpl: UserImpl);
    create(userInfo: CreateUserDto): Promise<{
        userIdx: string;
    }>;
    getAllFCM(): Promise<Record<"fcmTokens", object>>;
    getFcmByUserIdx(userIdx: number): Promise<Record<"fcmToken", string>>;
}
