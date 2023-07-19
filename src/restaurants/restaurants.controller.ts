import { Get, Param, UseFilters, UseInterceptors } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Post, Patch } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { ApiTags } from "@nestjs/swagger";
import { Controller, Body } from "@nestjs/common";
import { LocationDto } from "./dto/location.dto";
import { HttpExceptionFilter } from "src/aop/exception/http-exception.filter";
import { SuccessInterceptor } from "src/aop/interceptors/success.interceptor";

@ApiTags("Restaurants")
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller("restaurants")
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @ApiOperation({ summary: "API No. 5-1 유저 경도위도 저장" })
  @Post("mylocationsave")
  createUserLocation(@Body() location: LocationDto) {
    const { userIdx, latitude, longitude } = location;
    return this.restaurantsService.createUserLocation(
      userIdx,
      latitude,
      longitude
    );
  }

  @ApiOperation({ summary: "API No. 5-2유저 경도위도 업데이트" })
  @Patch("mylocationupdate")
  updateUserLocation(@Body() location: LocationDto) {
    const { userIdx, latitude, longitude } = location;
    return this.restaurantsService.updateUserLocation(
      userIdx,
      latitude,
      longitude
    );
  }

  @ApiOperation({ summary: "API No. 5-3 현재 user 3km이내 음식점 정보 조회" })
  @Get("list/:userIdx")
  getrestaurantlist(@Param("userIdx") userIdx: number) {
    return this.restaurantsService.getrestaurantlist(userIdx);
  }
}
