import { User } from "../../../resource/db/entities/User";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
export declare class CustomUserCommandRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    saveUser(userInfo: CreateUserDto): Promise<{
        userIdx: number;
    }>;
}
