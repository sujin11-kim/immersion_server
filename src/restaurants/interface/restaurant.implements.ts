import { Injectable } from "@nestjs/common";
import { RestaurantInterface } from "./restaurant.interface";
import { User } from "resource/db/entities/User";
import { Restaurant } from "resource/db/entities/Restaurant";
import { LocationDto } from "../dto/location.dto";
import { CustomRestaurantCommandRepository } from "../repository/restaurant-command.repository";
import { CustomRestaurantQueryRepository } from "../repository/restaurant-query.repository";

@Injectable()
export class RestaurantIml implements RestaurantInterface {
  constructor(
    private readonly customRestaurantCommandRepository: CustomRestaurantCommandRepository,
    private readonly customRestaurantQueryRepository: CustomRestaurantQueryRepository
  ) {}

  // 5-1 유저의 경도 위도 저장
  async createUserLocation(locationdto: LocationDto): Promise<User> {
    const user = await this.customRestaurantQueryRepository.checkExistUser(
      locationdto.userIdx
    );
    return await this.customRestaurantCommandRepository.saveUser(
      user,
      locationdto
    );
  }

  // 5-2 유저의 경도 위도 수정
  async updateUserLocation(locationdto: LocationDto): Promise<User> {
    const user = await this.customRestaurantQueryRepository.checkExistUser(
      locationdto.userIdx
    );
    return await this.customRestaurantCommandRepository.saveUser(
      user,
      locationdto
    );
  }

  // 5-3 3km 이내 음식점 정보 조회
  async getrestaurantlist(userIdx: number): Promise<Restaurant[]> {
    const user = await this.customRestaurantQueryRepository.checkExistUser(
      userIdx
    );
    return await this.customRestaurantQueryRepository.getrestaurantlist(
      userIdx
    );
  }
}
