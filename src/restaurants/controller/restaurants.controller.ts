import {
  Get,
  Param,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Post, Patch } from "@nestjs/common";
import { RestaurantsService } from "../service/restaurants.service";
import { ApiTags } from "@nestjs/swagger";
import { Controller, Body } from "@nestjs/common";
import { LocationDto } from "../dto/location.dto";
import { HttpExceptionFilter } from "src/aop/exception/http-exception.filter";
import { SuccessInterceptor } from "src/aop/interceptors/success.interceptor";
import { CreateRestaurantDto } from "../dto/create-restaurant.dto";
import { JwtAuthGuard } from "src/auth/utils/jwt/jwt.guard";
import { CurrentUser } from "src/aop/decorators/user.decorator";
import { UserLoginDto } from "src/users/dto/user-login.dto";

@ApiTags("Restaurants")
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller("restaurants")
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @ApiOperation({ summary: "API No. 5-1 유저 경도위도 저장" })
  @Post("mylocationsave")
  createUserLocation(@Body() locationdto: LocationDto) {
    return this.restaurantsService.createUserLocation(locationdto);
  }

  @ApiOperation({ summary: "API No. 5-2유저 경도위도 업데이트" })
  @Patch("mylocationupdate")
  updateUserLocation(@Body() locationdto: LocationDto) {
    return this.restaurantsService.updateUserLocation(locationdto);
  }

  @ApiOperation({ summary: "API No. 5-3 현재 user 3km이내 음식점 정보 조회" })
  @Get("list/:userIdx")
  getrestaurantlist(@Param("userIdx") userIdx: number) {
    return this.restaurantsService.getrestaurantlist(userIdx);
  }

  // 5-4 식당 및 메뉴 검색
  @ApiOperation({ summary: "식당 및 메뉴 검색" })
  @Get("/search/:searchWord")
  findMenuByRestaurant(@Param("searchWord") searchWord: string) {
    return this.restaurantsService.findMenu(searchWord);
  }

  // 5-5 식당 정보 등록
  @ApiOperation({ summary: "식당 정보 등록" })
  @UseGuards(JwtAuthGuard)
  @Post("/create")
  create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @CurrentUser() user: UserLoginDto
  ) {
    return this.restaurantsService.CreateRestaurant(
      createRestaurantDto,
      user.userIdx
    );
  }
}
