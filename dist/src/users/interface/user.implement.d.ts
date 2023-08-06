import { User } from "../../../resource/db/entities/User";
import { Repository } from "typeorm";
import { UserInterface } from "./user.interface";
import { CreateUserDto } from "../dto/create-user.dto";
import { CustomUserCommandRepository } from "../repository/user-command.repository";
import { CustomUserQueryRepository } from "../repository/user-query.repository";
export declare class UserImpl implements UserInterface {
    private readonly customUserCommandRepository;
    private readonly customUserQueryRepository;
    private userEntityRepository;
    constructor(customUserCommandRepository: CustomUserCommandRepository, customUserQueryRepository: CustomUserQueryRepository, userEntityRepository: Repository<User>);
    createUser(userInfo: CreateUserDto): Promise<{
        userIdx: string;
    }>;
    getAllFCM(): Promise<Record<"fcmTokens", object>>;
    getFCMByUserIdx(userIdx: number): Promise<Record<"fcmToken", string>>;
}
