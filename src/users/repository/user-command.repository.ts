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
    userInfo: T,
    queryRunner: QueryRunner | undefined = undefined
  ) {
    const { email, nickName, phone, password, fcmToken } = userInfo;
    const user = new User();
    user.email = email;
    user.nickName = nickName;
    user.phone = phone;
    user.password = password;
    user.fcmtoken = fcmToken;

    const repository = queryRunner ? queryRunner.manager.getRepository(User) : this.userRepository;

    const newUser = await repository.save(user);

    return newUser;
  }
}
