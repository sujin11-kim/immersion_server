import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { RestaurantInterface } from "./restaurant.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "resource/db/entities/User";
import { Restaurant } from "resource/db/entities/Restaurant";
import { LocationDto } from "../dto/location.dto";

import { CustomRestaurantQueryRepository } from "../repository/restaurant-query.repository";
import { CustomRestaurantCommandRepository } from "../repository/restaurant-command.repository";

@Injectable()
export class RestaurantIml implements RestaurantInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,

    private readonly customUserCommandRepository: CustomRestaurantCommandRepository,

    private readonly customUserQueryRepository: CustomRestaurantQueryRepository
  ) {}

  // 유저의 경도 위도 저장
  async createUserLocation(locationdto: LocationDto): Promise<User> {
    const user = await this.customUserCommandRepository.checkExistUser(
      locationdto.userIdx
    );
    return await this.customUserQueryRepository.saveUser(user, locationdto);
  }

  // 유저의 경도 위도 수정
  async updateUserLocation(locationdto: LocationDto): Promise<User> {
    const user = await this.customUserCommandRepository.checkExistUser(
      locationdto.userIdx
    );
    return await this.customUserQueryRepository.saveUser(user, locationdto);
  }

  // 3km 이내 음식점 정보 조회
  async getrestaurantlist(userIdx: number): Promise<Restaurant[]> {
    const user = await this.customUserCommandRepository.checkExistUser(userIdx);
    return await this.customUserQueryRepository.getrestaurantlist(userIdx);
  }
}
