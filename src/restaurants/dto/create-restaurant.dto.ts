import { PickType } from "@nestjs/swagger";
import { Restaurant } from "../../../resource/db/entities/Restaurant";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRestaurantDto extends PickType(Restaurant, [
  "userIdx",
  "restaurantName",
  "openTime",
  "closeTime",
  "telNum",
  "restaurantIntro",
]) {
  @IsNotEmpty()
  userIdx: number;

  @IsNotEmpty()
  @IsString()
  restaurantName: string;

  @IsNotEmpty()
  @IsString()
  openTime: string;

  @IsNotEmpty()
  @IsString()
  closeTime: string;

  @IsNotEmpty()
  @IsString()
  telNum: string;

  @IsNotEmpty()
  @IsString()
  restaurantIntro: string;

  image: string[];
}
