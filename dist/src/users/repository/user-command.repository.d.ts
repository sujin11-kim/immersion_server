import { User } from "../../../resource/db/entities/User";
import { Repository } from "typeorm";
export declare class CustomUserCommandRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    saveUser<T extends Record<string, any>>(userInfo: T): Promise<{
        userIdx: number;
    }>;
}
