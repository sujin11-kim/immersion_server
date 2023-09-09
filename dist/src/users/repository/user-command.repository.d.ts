import { Repository, QueryRunner } from 'typeorm';
import { User } from '../../../resource/db/entities/User';
export declare class CustomUserCommandRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    signUp<T extends Record<string, any>>(userInfo: User, queryRunner?: QueryRunner | undefined): Promise<User>;
    storeRefreshToken<T extends Record<string, any>>(userInfo: User, refreshToken: string, queryRunner?: QueryRunner | undefined): Promise<User>;
}
