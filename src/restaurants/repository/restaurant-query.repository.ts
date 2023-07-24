//creat,update,delete            save관련

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "resource/db/entities/Restaurant";
import { User } from "resource/db/entities/User";

import { In, Repository } from "typeorm";
import { LocationDto } from "../dto/location.dto";
import { calculateDistance } from "../utill/calculateDistance";

@Injectable()
export class CustomRestaurantQueryRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>
  ) {}

  async saveUser(user, locationdto) {
    user.latitude = locationdto.latitude;
    user.longitude = locationdto.longitude;
    return await this.userRepository.save(user);
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
