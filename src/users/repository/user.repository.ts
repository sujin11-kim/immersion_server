import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../resource/db/entities/User";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class CustomUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  //user 정보 중복 체크
  async checkDuplicate(userInfo: CreateUserDto) {
    const userByEmail = await this.userRepository.findOne({
      where: { email: userInfo.email },
    });
    if (userByEmail)
      throw new BadRequestException({
        statusCode: 2001,
        message: "이미 존재하는 이메일입니다.",
        result: { userIdx: "" },
      });

    const userBynickName = await this.userRepository.findOne({
      where: { nickName: userInfo.nickName },
    });
    if (userBynickName)
      throw new BadRequestException({
        statusCode: 2002,
        message: "이미 존재하는 닉네임입니다.",
        result: { userIdx: "" },
      });

    const userByphone = await this.userRepository.findOne({
      where: { phone: userInfo.phone },
    });
    if (userByphone)
      throw new BadRequestException({
        statusCode: 2003,
        message: "이미 존재하는 핸드폰 번호입니다.",
        result: { userIdx: "" },
      });
  }

  //새로운 user 저장
  async saveUser(userInfo: CreateUserDto) {
    const { email, nickName, phone, password, fcmToken } = userInfo;

    const user = new User();
    (user.email = email),
      (user.nickName = nickName),
      (user.phone = phone),
      (user.password = password),
      (user.fcmtoken = fcmToken);
    const newUser = await this.userRepository.save(user);

    return newUser;
  }

  //모든 fcmtoken 반환
  async findAllFcm() {
    const users = await this.userRepository.find();
    const fcmTokens = users.reduce((result, user) => {
      result[user.userIdx] = user.fcmtoken;
      return result;
    }, {});

    if (!fcmTokens)
      throw new BadRequestException({
        statusCode: 4001,
        message: "fcmToken이 존재하지 않습니다.",
        result: { fcmTokens: {} },
      });

    return { fcmTokens };
  }

  //유저 존재 확인 By userIdx
  async isUserExistsByUserIdx(userIdx: number) {
    const user = await this.userRepository.findOne({ where: { userIdx } });

    if (!user)
      throw new NotFoundException({
        statusCode: 4002,
        message: "존재하지 않는 유저입니다.",
        result: { fcmTokens: "" },
      });
  }

  //개인 fcmtoken 반환 By userIdx
  async getFCMByUserIdx(userIdx: number) {
    const user = await this.userRepository.findOne({ where: { userIdx } });
    const fcmToken = user?.fcmtoken || null;

    return fcmToken;
  }
}
