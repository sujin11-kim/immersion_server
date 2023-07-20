import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserImpl } from "../interface/user.implement";

@Injectable()
export class UsersService {
  constructor(private userImpl: UserImpl) {}

  // 1-1 회원가입
  async create(userInfo: CreateUserDto) {
    return await this.userImpl.createUser(userInfo);
  }

  // 1-5 모든 fcm 토큰 조회
  async getAllFCM() {
    return await this.userImpl.getAllFCM();
  }

  // 1-6 개인 fcm 토큰 조회
  async getFcmByUserIdx(userIdx: number) {
    return await this.userImpl.getFCMByUserIdx(userIdx);
  }

  async login(_id: string, _password: string): Promise<string> {
    //TODO JWT발급
    throw new Error("Method not implemented");
  }
}
