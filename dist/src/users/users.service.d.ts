import { DataSource, Repository } from "typeorm";
import { User } from "../../mymodel/entities/user.entity";
export declare class UsersService {
    private userRepository;
    private dataSource;
    constructor(userRepository: Repository<User>, dataSource: DataSource);
    create(id: number, nickname: string, phone: string, enrolldate: Date, password: string): Promise<void>;
    login(_id: string, _password: string): Promise<string>;
}
