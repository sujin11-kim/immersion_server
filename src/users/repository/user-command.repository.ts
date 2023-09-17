import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { User } from '../../../resource/db/entities/User';

@Injectable()
export class CustomUserCommandRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // 새로운 user 저장
  public async signUp<T extends Record<string, any>>(
    userInfo: User,
    queryRunner: QueryRunner | undefined = undefined
  ) {
    const { email, nickName, phone, password, fcmtoken } = userInfo;
    const user = new User();
    user.email = email;
    user.nickName = nickName;
    user.phone = phone;
    user.password = password;
    user.fcmtoken = fcmtoken;

    const repository = queryRunner ? queryRunner.manager.getRepository(User) : this.userRepository;

    const newUser = await repository.save(user);

    return newUser;
  }

  public async storeRefreshToken<T extends Record<string, any>>(
    userInfo: User,
    refreshToken: string,
    queryRunner: QueryRunner | undefined = undefined
  ) {
    userInfo.refreshToken = refreshToken; // db에 refreshtoken update

    const repository = queryRunner ? queryRunner.manager.getRepository(User) : this.userRepository;

    const newUser = await repository.save(userInfo);

    return newUser;
  }

  public async storeAccessTokenToRedis<T extends Record<string, any>>(
    userInfo: User,
    refreshToken: string,
    queryRunner: QueryRunner | undefined = undefined
  ) {
    // access token redis 저장.

    return ;
  }
}
