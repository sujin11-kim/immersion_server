import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User } from "../../../resource/db/entities/User";
import { UserLoginDto } from "../dto/user-login.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserImpl } from "../interface/user.implement";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource,
    private userInterface: UserImpl
  ) {}

  // 1-1 회원가입
  async create(userInfo: CreateUserDto) {
    return await this.userInterface.createUser(userInfo);
  }

  // 1-5 모든 fcm 토큰 조회
  async getAllFCM() {
    return await this.userInterface.getAllFCM();
  }

  // 1-6 개인 fcm 토큰 조회
  async getFcmByUserIdx(userIdx: number) {
    return await this.userInterface.getFCMByUserIdx(userIdx);
  }

  async login(_id: string, _password: string): Promise<string> {
    //TODO JWT발급
    throw new Error("Method not implemented");
  }
}
