import { DataSource, Repository } from "typeorm";
import { User } from "../../mymodel/entities/User";
export declare class UsersService {
    private userRepository;
    private dataSource;
    constructor(userRepository: Repository<User>, dataSource: DataSource);
    create(id: number, nickname: string, phone: string, enrollDate: Date, password: string): Promise<{
        message: string;
    }>;
    login(_id: string, _password: string): Promise<string>;
}
