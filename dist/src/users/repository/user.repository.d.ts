import { User } from "../../../resource/db/entities/User";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
export declare class CustomUserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    checkDuplicate(userInfo: CreateUserDto): Promise<void>;
    saveUser(userInfo: CreateUserDto): Promise<User>;
    findAllFcm(): Promise<{
        fcmTokens: {};
    }>;
    isUserExistsByUserIdx(userIdx: number): Promise<void>;
    getFCMByUserIdx(userIdx: number): Promise<string>;
}
