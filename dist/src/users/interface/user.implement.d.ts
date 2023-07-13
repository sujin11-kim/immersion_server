import { User } from "../../../mymodel/entities/User";
import { Repository } from "typeorm";
import { UserInterface } from "./user.interface";
import { CreateUserDto } from "../dto/create-user.dto";
import { CustomUserRepository } from "../repository/user.repository";
export declare class UserImplement implements UserInterface {
    private readonly userRepository;
    private userEntityRepository;
    constructor(userRepository: CustomUserRepository, userEntityRepository: Repository<User>);
    createUser(userInfo: CreateUserDto): Promise<{
        userIdx: number;
    }>;
}
