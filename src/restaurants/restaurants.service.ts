import { BadRequestException, HttpException } from "@nestjs/common";
import { Repository, In } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { User } from "../../resource/db/entities/User";
import { Restaurant } from "../../resource/db/entities/Restaurant";

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // 지구 반지름 (미터)
  const phi1 = (lat1 * Math.PI) / 180; // 위도1 (라디안)
  const phi2 = (lat2 * Math.PI) / 180; // 위도2 (라디안)
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180; // 위도 차이 (라디안)
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180; // 경도 차이 (라디안)

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>
  ) {}

  async createUserLocation(
    userIdx: number,
    latitude: number,
    longitude: number
  ) {
    const user = await this.userRepository.findOne({ where: { userIdx } });
    console.log("유저 정보:", user);
    if (!user) {
      throw new HttpException({ message: "존재하지 않는 id 입니다." }, 201);
    }

    user.latitude = latitude;
    user.longitude = longitude;

    return await this.userRepository.save(user);
  }

  async updateUserLocation(
    userIdx: number,
    latitude: number,
    longitude: number
  ) {
    const user = await this.userRepository.findOne({ where: { userIdx } });

    user.latitude = latitude;
    user.longitude = longitude;
    return await this.userRepository.save(user);
  }

  async getrestaurantlist(userIdx: number) {
    const user = await this.userRepository.findOne({ where: { userIdx } });
    const restaurants = await this.restaurantRepository.find();
    if (!user) {
      throw new BadRequestException({
        statusCode: 2100,
        message: "존재하지 않는 사용자 입니다.",
      });
    }

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
