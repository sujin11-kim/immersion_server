import { DataSource, Repository } from "typeorm";
import { User } from "../../../resource/db/entities/User";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserImpl } from "../interface/user.implement";
export declare class UsersService {
    private userRepository;
    private dataSource;
    private userInterface;
    constructor(userRepository: Repository<User>, dataSource: DataSource, userInterface: UserImpl);
    create(userInfo: CreateUserDto): Promise<{
        userIdx: string;
    }>;
    getAllFCM(): Promise<Record<"fcmTokens", object>>;
    getFcmByUserIdx(userIdx: number): Promise<Record<"fcmToken", string>>;
    login(_id: string, _password: string): Promise<string>;
}
