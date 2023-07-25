import { IsNumber } from "class-validator";

export class LocationDto {
  userIdx: number;

  @IsNumber()
  latitude: number;
  @IsNumber()
  longitude: number;
}
