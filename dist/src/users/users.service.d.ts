import { DataSource, Repository } from 'typeorm';
import { User } from '../../mymodel/entities/User';
export declare class UsersService {
    private usersRepository;
    private dataSource;
    constructor(usersRepository: Repository<User>, dataSource: DataSource);
    create(ID: number, name: string, phone: string): Promise<boolean>;
}
