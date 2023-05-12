import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { RestaurantsController } from "./restaurants.controller";
import { RestaurantsService } from "./restaurants.service";
import { Restaurant } from "mymodel/entities/Restaurant";
import { User } from "mymodel/entities/User";

@Module({
  imports: [TypeOrmModule.forFeature([User, Restaurant])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
