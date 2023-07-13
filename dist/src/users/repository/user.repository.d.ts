import { User } from "mymodel/entities/User";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
export declare class CustomUserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    checkDuplicate(userInfo: CreateUserDto): Promise<void>;
    saveUser(userInfo: CreateUserDto): Promise<User>;
}
