import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../resource/db/entities/User";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class CustomUserCommandRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  //새로운 user 저장
  async saveUser(userInfo: CreateUserDto) {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();
      const { email, nickName, phone, password, fcmToken } = userInfo;

      const user = queryRunner.manager.getRepository(User).create();
      (user.email = email),
        (user.nickName = nickName),
        (user.phone = phone),
        (user.password = password),
        (user.fcmtoken = fcmToken);
      const newUser = await queryRunner.manager.getRepository(User).save(user);

      await queryRunner.commitTransaction();
      return { userIdx: newUser.userIdx };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
