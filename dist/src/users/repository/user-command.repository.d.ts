import { Repository, QueryRunner } from 'typeorm';
import { User } from '../../../resource/db/entities/User';
export declare class CustomUserCommandRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    signUp<T extends Record<string, any>>(userInfo: T, queryRunner?: QueryRunner | undefined): Promise<User>;
}
