//read    find, find 관련
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "resource/db/entities/User";
import { Restaurant } from "resource/db/entities/Restaurant";
import { In, Repository } from "typeorm";
import { calculateDistance } from "../utill/calculateDistance";
@Injectable()
export class CustomRestaurantQueryRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>
  ) {}

  //존재하는 User인지 확인
  async checkExistUser(userIdx: number) {
    const user = await this.userRepository.findOne({ where: { userIdx } });
    return user;
  }

  async getrestaurantlist(userIdx: number) {
    const restaurants = await this.restaurantRepository.find();
    const user = await this.userRepository.findOne({ where: { userIdx } });

    const nearbyRestaurantIdxs: number[] = [];
    for (const restaurant of restaurants) {
      const distance = calculateDistance(
        user.latitude,
        user.longitude,
        restaurant.latitude,
        restaurant.longitude
      );
      if (distance < 3000) {
        nearbyRestaurantIdxs.push(restaurant.restaurantIdx);
      }
    }

    const nearbyrestaurant = await this.restaurantRepository.find({
      where: {
        restaurantIdx: In(nearbyRestaurantIdxs),
      },
    });

    return nearbyrestaurant;
  }
}
