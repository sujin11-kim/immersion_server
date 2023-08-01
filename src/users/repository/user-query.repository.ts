import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../resource/db/entities/User";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { CustomExceptions } from "src/aop/exception/custom-exception";

@Injectable()
export class CustomUserQueryRepository {
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
      throw new BadRequestException(CustomExceptions.EMAIL_ALREADY_EXISTS);

    const userBynickName = await this.userRepository.findOne({
      where: { nickName: userInfo.nickName },
    });
    if (userBynickName)
      throw new BadRequestException(CustomExceptions.NICKNAME_ALREADY_EXISTS);

    const userByphone = await this.userRepository.findOne({
      where: { phone: userInfo.phone },
    });
    if (userByphone)
      throw new BadRequestException(CustomExceptions.PHONE_ALREADY_EXISTS);
  }

  //모든 fcmtoken 반환
  async findAllFcm() {
    const users = await this.userRepository.find();

    if (users.length === 0) {
      throw new BadRequestException(CustomExceptions.FCMTOKEN_NOT_FOUND);
    }

    const fcmTokens = users.reduce((result, user) => {
      result[user.userIdx] = user.fcmtoken;
      return result;
    }, {});

    return { fcmTokens };
  }

  //유저 존재 확인 By userIdx
  async isUserExistsByUserIdx(userIdx: number) {
    const user = await this.userRepository.findOne({ where: { userIdx } });

    if (!user) throw new NotFoundException(CustomExceptions.USER_NOT_FOUND);
  }

  //개인 fcmtoken 반환 By userIdx
  async getFCMByUserIdx(userIdx: number) {
    const user = await this.userRepository.findOne({ where: { userIdx } });
    const fcmToken = user?.fcmtoken || null;

    return fcmToken;
  }
}
