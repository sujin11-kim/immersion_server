import { Injectable } from "@nestjs/common";
import { RestaurantInterface } from "./restaurant.interface";
import { User } from "resource/db/entities/User";
import { Restaurant } from "resource/db/entities/Restaurant";
import { LocationDto } from "../dto/location.dto";
import { CustomRestaurantCommandRepository } from "../repository/restaurant-command.repository";
import { CustomRestaurantQueryRepository } from "../repository/restaurant-query.repository";
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { calculateDistance } from "../utill/calculateDistance";
import { CreateRestaurantDto } from "../dto/create-restaurant.dto";

@Injectable()
export class RestaurantIml implements RestaurantInterface {
  constructor(
    private readonly customRestaurantCommandRepository: CustomRestaurantCommandRepository,
    private readonly customRestaurantQueryRepository: CustomRestaurantQueryRepository,
    private errorResponse: ErrorResponse
  ) {}

  // 5-1 유저의 경도 위도 저장
  async createUserLocation(locationdto: LocationDto): Promise<User> {
    //존재하는 User인지 확인
    const user = await this.customRestaurantQueryRepository.checkExistUser(
      locationdto.userIdx
    );

    if (!user) {
      throw this.errorResponse.notExistUser();
    }

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

    if (!user) {
      throw this.errorResponse.notExistUser();
    }

    return await this.customRestaurantCommandRepository.saveUser(
      user,
      locationdto
    );
  }

  // 5-3 3km 이내 음식점 정보 조회
  async getrestaurantlist(userIdx: number): Promise<Restaurant[]> {
    // 1. 전체 가게 배열로 받아오기                    쿼리파일 작성
    // 2. useridx 를 가진 유저 한명 가져오기            쿼리파일 작성
    // 3. 조건을 만족하는 가게들의 idx 구하기
    // 4. 조건은 만족한 가게 idx 로 가게전체 데이터 가져오기      쿼리파일 작성하기

    const restaurants =
      await this.customRestaurantQueryRepository.getAllResturant();

    const user = await this.customRestaurantQueryRepository.checkExistUser(
      userIdx
    );

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

    return await this.customRestaurantQueryRepository.getNearByResturants(
      nearbyRestaurantIdxs
    );
  }

  // 5-4 식당 및 메뉴 검색
  async findMenu(searchWord: string): Promise<any> {
    let menuList =
      await this.customRestaurantQueryRepository.findMenuByRestaurant(
        searchWord
      );

    if (menuList.length === 0) {
      this.errorResponse.notFoundSearch();
    }

    return { menuList };
  }

  // 5-5 식당 정보 등록
  async CreateRestaurant(restaurantInfo: CreateRestaurantDto, userIdx: number) {
    // 공백 제거 후 글자수 제한
    const maxContentLength = 1;
    const contentWithoutSpace = restaurantInfo.restaurantIntro.replace(
      /\s/g,
      ""
    );
    if (contentWithoutSpace.length > maxContentLength) {
      this.errorResponse.exceedContentLength();
    }

    return await this.customRestaurantCommandRepository.CreateRestaurant(
      restaurantInfo,
      userIdx
    );
  }
}
