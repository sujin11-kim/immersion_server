import { DataSource, Repository } from "typeorm";
import { User } from "../../mymodel/entities/User";
import { UserLoginDto } from "./dto/user-login.dto";
export declare class UsersService {
    private userRepository;
    private dataSource;
    constructor(userRepository: Repository<User>, dataSource: DataSource);
    create(email: string, nickname: string, phone: string, password: string): Promise<{
        message: string;
    }>;
    saveFCMToken(loginUser: UserLoginDto, fcmToken: string): Promise<{
        message: string;
    }>;
    findFCM(): Promise<{
        fcmTokens: {};
    }>;
    login(_id: string, _password: string): Promise<string>;
}
