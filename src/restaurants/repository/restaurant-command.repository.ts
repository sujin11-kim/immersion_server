//creat,update,delete            save 관련
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "resource/db/entities/User";
import { Repository } from "typeorm";
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { CreateRestaurantDto } from "../dto/create-restaurant.dto";
import { Restaurant } from "resource/db/entities/Restaurant";
import { RestaurantImage } from "resource/db/entities/RestaurantImage";

@Injectable()
export class CustomRestaurantCommandRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private errorResponse: ErrorResponse,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(RestaurantImage)
    private readonly restaurantImageRepository: Repository<RestaurantImage>
  ) {}

  async saveUser(user, locationdto) {
    user.latitude = locationdto.latitude;
    user.longitude = locationdto.longitude;
    return await this.userRepository.save(user);
  }

  // 게시물 정보 저장
  async CreateRestaurant(
    restaurantInfo: CreateRestaurantDto,
    userIdx: number
  ): Promise<CreateRestaurantDto> {
    const queryRunner =
      this.restaurantRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const restaurant = queryRunner.manager.getRepository(Restaurant).create();
      restaurant.userIdx = userIdx;
      restaurant.restaurantName = restaurantInfo.restaurantName;
      restaurant.openTime = restaurantInfo.openTime;
      restaurant.closeTime = restaurantInfo.closeTime;
      restaurant.telNum = restaurantInfo.telNum;
      restaurant.restaurantIntro = restaurantInfo.restaurantIntro;

      const newRestaurant = await queryRunner.manager
        .getRepository(Restaurant)
        .save(restaurant);

      const imagePromises = restaurantInfo.image.map(async (imagePath) => {
        const image = queryRunner.manager
          .getRepository(RestaurantImage)
          .create();
        image.restaurantIdx = newRestaurant.restaurantIdx;
        image.imagePath = imagePath;
        await queryRunner.manager.getRepository(RestaurantImage).save(image);
      });

      await Promise.all(imagePromises);

      await queryRunner.commitTransaction();
      return {
        ...restaurantInfo,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
