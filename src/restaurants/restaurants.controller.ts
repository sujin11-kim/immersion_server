import { Get, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Post, Patch } from "@nestjs/common";
import { RestaurantsService } from "./restaurants.service";
import { UseFilters } from "@nestjs/common/decorators/core/exception-filters.decorator";
import { UseInterceptors } from "@nestjs/common/decorators/core/use-interceptors.decorator";
import { ApiTags } from "@nestjs/swagger";
import { Controller, Body } from "@nestjs/common";
import { HttpExceptionFilter } from "src/common/exception/http-exception.filter";
import { SuccessInterceptor } from "src/common/intercepors/suucess.interceptor";
import { LocationDto } from "./dto/location.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { CurrentUser } from "src/common/decorators/user.decorator";
import { UserLoginDto } from "src/users/dto/user-login.dto";

@ApiTags("Restaurants")
// @UseInterceptors(SuccessInterceptor)
// @UseFilters(HttpExceptionFilter)
@Controller("restaurants")
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @ApiOperation({ summary: "API No. 5-1 유저 경도위도 저장" })
  @Post("mylocation")
  createUserLocation(@Body() location: LocationDto) {
    const { userIdx, latitude, longitude } = location;
    return this.restaurantsService.createUserLocation(
      userIdx,
      latitude,
      longitude
    );
  }

  @ApiOperation({ summary: "API No. 5-2유저 경도위도 업데이트" })
  @Patch("mylocation")
  updateUserLocation(@Body() location: LocationDto) {
    const { userIdx, latitude, longitude } = location;
    return this.restaurantsService.updateUserLocation(
      userIdx,
      latitude,
      longitude
    );
  }

  // @ApiOperation({ summary: "API No. 5-3 현재 user 3km이내 음식점 정보 조회" })
  // @Get("list")
  // getrestaurantlist(@CurrentUser() user: UserLoginDto){
  //     return  this.restaurantsService.getrestaurantlist(user.id)
  // }
}
