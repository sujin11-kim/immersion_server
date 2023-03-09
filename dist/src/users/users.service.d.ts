import { DataSource, Repository } from "typeorm";
import { User } from "../../mymodel/entities/user.entity";
export declare class UsersService {
    private userRepository;
    private dataSource;
    constructor(userRepository: Repository<User>, dataSource: DataSource);
    create(id: string, nickname: string, phone: string, favorite: string, enrolldate: Date, regflag: string, password: string, type: string): Promise<void>;
    login(_id: string, _password: string): Promise<string>;
}
