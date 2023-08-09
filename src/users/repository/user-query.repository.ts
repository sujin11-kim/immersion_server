import {
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../resource/db/entities/User";
import { Repository } from "typeorm";
import { ErrorResponse } from "src/aop/exception/error-reponse";

@Injectable()
export class CustomUserQueryRepository {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private errorResponse : ErrorResponse
  ) {} 

  async getByUserIdx(userIdx: number) {
    const user = await this.userRepository.findOne({ where: { userIdx } });
    
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }});
    
    return user;
  }

  // 모든 fcmtoken 반환
  async findAllFcm() {
    const users = await this.userRepository.find();

    if (users.length === 0) {
      throw this.errorResponse.notExistFCM;
    }

    const fcmTokens = users.reduce((result, user) => {
      result[user.userIdx] = user.fcmtoken;
      return result;
    }, {});

    return { fcmTokens };
  }

  async getFCMByUserIdx(userIdx: number) {
    const user = await this.userRepository.findOne({ where: { userIdx } });
    const fcmToken = user?.fcmtoken || null;

    return fcmToken;
  }
}
