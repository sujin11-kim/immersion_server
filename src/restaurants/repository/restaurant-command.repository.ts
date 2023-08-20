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
    restaurantInfo: CreateRestaurantDto
  ): Promise<CreateRestaurantDto> {
    const queryRunner =
      this.restaurantRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const restaurant = queryRunner.manager.getRepository(Restaurant).create();
      restaurant.userIdx = restaurantInfo.userIdx;
      restaurant.restaurantName = restaurantInfo.restaurantName;
      restaurant.openTime = restaurantInfo.openTime;
      restaurant.closeTime = restaurantInfo.closeTime;
      restaurant.telNum = restaurantInfo.telNum;
      restaurant.restaurantIntro = restaurantInfo.restaurantIntro;

      await queryRunner.manager.getRepository(Restaurant).save(restaurant);

      const restaurantFromDb = await this.restaurantRepository.findOne({
        where: { restaurantName: restaurantInfo.restaurantName },
      });

      const imagePromises = restaurantInfo.image.map(async (imagePath) => {
        const image = this.restaurantImageRepository.create();
        image.restaurantIdx = restaurantFromDb.restaurantIdx;
        image.imagePath = imagePath;
        await this.restaurantImageRepository.save(image);
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
