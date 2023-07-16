import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { User } from "../../../resource/db/entities/User";
import { Repository } from "typeorm";
import { UserInterface } from "./user.interface";
import { CreateUserDto } from "../dto/create-user.dto";
import { CustomUserRepository } from "../repository/user.repository";

@Injectable()
export class UserImpl implements UserInterface {
  constructor(
    private readonly customUserRepository: CustomUserRepository,
    @InjectRepository(User)
    private userEntityRepository: Repository<User>
  ) {}

  // 1-1 회원가입
  async createUser(userInfo: CreateUserDto): Promise<{ userIdx: number }> {
    const queryRunner =
      this.userEntityRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const hashedPassword = await bcrypt.hash(userInfo.password, 12);
      await this.customUserRepository.checkDuplicate(userInfo);

      const newUser = await this.customUserRepository.saveUser({
        ...userInfo,
        password: hashedPassword,
      });

      await queryRunner.commitTransaction();
      return { userIdx: newUser.userIdx };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // 1-5 모든 FCM 토큰 조회
  async getAllFCM(): Promise<Record<"fcmTokens", object>> {
    const allFcmtoken = await this.customUserRepository.findAllFcm();
    return allFcmtoken;
  }

  // 1-6 개인 FCM 토큰 조회
  async getFCMByUserIdx(userIdx: number): Promise<Record<"fcmToken", string>> {
    await this.customUserRepository.isUserExistsByUserIdx(userIdx);
    const fcmToken = await this.customUserRepository.getFCMByUserIdx(userIdx);
    return { fcmToken };
  }
}
