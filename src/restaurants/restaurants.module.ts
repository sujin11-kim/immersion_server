import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { RestaurantsController } from "./restaurants.controller";
import { RestaurantsService } from "./restaurants.service";
import { Restaurant } from "../../resource/db/entities/Restaurant";
import { User } from "../../resource/db/entities/User";

@Module({
  imports: [TypeOrmModule.forFeature([User, Restaurant])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
