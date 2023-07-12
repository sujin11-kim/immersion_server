import { DataSource, Repository } from "typeorm";
import { User } from "../../../mymodel/entities/User";
import { UserLoginDto } from "../dto/user-login.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserImplement } from "../interface/user.implement";
export declare class UsersService {
    private userRepository;
    private dataSource;
    private userInterface;
    constructor(userRepository: Repository<User>, dataSource: DataSource, userInterface: UserImplement);
    create(userInfo: CreateUserDto): Promise<{
        userIdx: number;
    }>;
    saveFCMToken(loginUser: UserLoginDto, fcmToken: string): Promise<{
        message: string;
    }>;
    findFCM(): Promise<{
        fcmTokens: {};
    }>;
    login(_id: string, _password: string): Promise<string>;
}
