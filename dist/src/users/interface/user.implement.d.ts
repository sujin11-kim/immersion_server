import { User } from "../../../resource/db/entities/User";
import { Repository } from "typeorm";
import { UserInterface } from "./user.interface";
import { CreateUserDto } from "../dto/create-user.dto";
import { CustomUserRepository } from "../repository/user.repository";
export declare class UserImpl implements UserInterface {
    private readonly customUserRepository;
    private userEntityRepository;
    constructor(customUserRepository: CustomUserRepository, userEntityRepository: Repository<User>);
    createUser(userInfo: CreateUserDto): Promise<{
        userIdx: number;
    }>;
    getAllFCM(): Promise<Record<"fcmTokens", object>>;
    getFCMByUserIdx(userIdx: number): Promise<Record<"fcmToken", string>>;
}
