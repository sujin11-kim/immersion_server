import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "mymodel/entities/User";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class CustomUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

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
}
