import { Injectable } from "@nestjs/common";
import { LocationDto } from "../dto/location.dto";
import { RestaurantIml } from "../interface/restaurant.implements";
import { CreateRestaurantDto } from "../dto/create-restaurant.dto";

@Injectable()
export class RestaurantsService {
  constructor(private restaurantImpl: RestaurantIml) {}

  async createUserLocation(locationdto: LocationDto) {
    return await this.restaurantImpl.createUserLocation(locationdto);
  }

  async updateUserLocation(locationdto: LocationDto) {
    return await this.restaurantImpl.updateUserLocation(locationdto);
  }

  async getrestaurantlist(userIdx: number) {
    return await this.restaurantImpl.getrestaurantlist(userIdx);
  }

  // 5-4 식당 및 메뉴 검색
  async findMenu(searchWord: string) {
    return await this.restaurantImpl.findMenu(searchWord);
  }

  // 5-5 식당 정보 등록
  async CreateRestaurant(createRestaurantDto: CreateRestaurantDto) {
    return await this.restaurantImpl.CreateRestaurant(createRestaurantDto);
  }
}
