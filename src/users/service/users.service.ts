import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User } from "../../../mymodel/entities/User";
import { UserLoginDto } from "../dto/user-login.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserImplement } from "../interface/user.implement";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
    private userInterface: UserImplement
  ) {}

  //회원가입
  async create(userInfo: CreateUserDto) {
    return await this.userInterface.createUser(userInfo);
  }

  //FCMtoken 저장
  async saveFCMToken(loginUser: UserLoginDto, fcmToken: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.startTransaction();

      const user = await this.userRepository.findOne({
        where: { email: loginUser.email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      user.fcmtoken = fcmToken;
      const updateUser = await this.userRepository.save(user);
      console.log(user);
      await queryRunner.commitTransaction();

      return { message: "FCM 토큰이 저장되었습니다." };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findFCM() {
    const users = await this.userRepository.find();
    const fcmTokens = users.reduce((result, user) => {
      result[user.userIdx] = user.fcmtoken;
      return result;
    }, {});

    return { fcmTokens };
  }

  async login(_id: string, _password: string): Promise<string> {
    //TODO JWT발급
    throw new Error("Method not implemented");
  }
}
