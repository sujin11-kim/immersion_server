import { HttpException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { User } from "mymodel/entities/User";
import { Restaurant } from "mymodel/entities/Restaurant";
import { LocationDto } from "./dto/location.dto";

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

    // return { message: "유저의 위치 저장에 성공하였습니다." };
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

    // return { message: "유저의 위치 업데이트에 성공하였습니다." };
  }
}
