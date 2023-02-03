import { DataSource, Repository } from 'typeorm';
import Users from './entities/users.entity';
export declare class UsersService {
    private usersRepository;
    private dataSource;
    constructor(usersRepository: Repository<Users>, dataSource: DataSource);
    create(id: string, nickname: string, phone: number, password: string): Promise<boolean>;
    findById(id: string): Promise<Users>;
}
