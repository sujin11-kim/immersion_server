import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "../../mymodel/entities/User";
import { UserLoginDto } from "./dto/user-login.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource
  ) {}

  async create(
    email: string,
    nickname: string,
    phone: string,
    password: string
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    const hashedPassword = await bcrypt.hash(password, 12);

    const userEmail = await this.userRepository.findOne({ where: { email } });
    console.log(userEmail);
    if (userEmail) {
      throw new HttpException({ message: "이미 존재하는 이메일 입니다." }, 201);
    }

    const user = new User();
    (user.email = email),
      (user.nickName = nickname),
      (user.phone = phone),
      (user.password = hashedPassword),
      await queryRunner.manager.save(user);

    return { message: "회원가입에 성공하였습니다." };
  }

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
