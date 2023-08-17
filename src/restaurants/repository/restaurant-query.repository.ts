//read    find, find 관련
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "resource/db/entities/User";
import { Restaurant } from "resource/db/entities/Restaurant";
import { In, Repository } from "typeorm";
@Injectable()
export class CustomRestaurantQueryRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>
  ) {}

  // 전체 가게 데이터 반환
  async getAllResturant(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantRepository.find();
    return restaurants;
  }

  //존재하는 User인지 확인 후 유저 반환
  async checkExistUser(userIdx: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userIdx } });
    return user;
  }

  // 3km이내 가게들 idx 받아서 가게 전체 데이터 변환
  async getNearByResturants(
    nearbyRestaurantIdxs: number[]
  ): Promise<Restaurant[]> {
    const nearbyrestaurant = await this.restaurantRepository.find({
      where: {
        restaurantIdx: In(nearbyRestaurantIdxs),
      },
    });

    return nearbyrestaurant;
  }
}
