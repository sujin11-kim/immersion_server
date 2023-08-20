import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { RestaurantsController } from "./controller/restaurants.controller";
import { RestaurantsService } from "./service/restaurants.service";
import { Restaurant } from "../../resource/db/entities/Restaurant";
import { User } from "../../resource/db/entities/User";
import { RestaurantIml } from "./interface/restaurant.implements";
import { CustomRestaurantCommandRepository } from "./repository/restaurant-command.repository";
import { CustomRestaurantQueryRepository } from "./repository/restaurant-query.repository";
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { Menu } from "resource/db/entities/Menu";

@Module({
  imports: [TypeOrmModule.forFeature([User, Restaurant, Menu])],
  controllers: [RestaurantsController],
  providers: [
    RestaurantsService,
    RestaurantIml,
    CustomRestaurantCommandRepository,
    CustomRestaurantQueryRepository,
    ErrorResponse,
  ],
})
export class RestaurantsModule {}
