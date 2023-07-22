//read    findonem, find 관련

import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "resource/db/entities/Restaurant";
import { User } from "resource/db/entities/User";

import { Repository } from "typeorm";

@Injectable()
export class CustomRestaurantCommandRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>
  ) {}

  //존재하는 User인지 확인
  async checkExistUser(userIdx: number) {
    const user = await this.userRepository.findOne({ where: { userIdx } });

    if (!user) {
      throw new BadRequestException({
        statusCode: 2100,
        message: "존재하지 않는 사용자 입니다.",
      });
    }
    return user;
  }
}
