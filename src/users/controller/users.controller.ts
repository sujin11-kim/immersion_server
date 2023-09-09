import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Headers,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../dto/create-user.dto";
import { UsersService } from "../service/users.service";
import { AuthService } from "src/auth/service/auth.service";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { JwtAuthGuard } from "src/auth/utils/jwt/jwt.guard";
import { CurrentUser } from "../../aop/decorators/user.decorator";
import { UseInterceptors } from "@nestjs/common/decorators/core/use-interceptors.decorator";
import { SuccessInterceptor } from "../../aop/interceptors/success.interceptor";
import { UseFilters } from "@nestjs/common/decorators/core/exception-filters.decorator";
import { HttpExceptionFilter } from "../../aop/exception/http-exception.filter";
import { PositiveIntPipe } from "src/aop/pipes/positiveInt.pipe";
import { JwtRefreshAuthGuard } from "src/auth/utils/jwt/jwt-refresh.gaurd";

@ApiTags("유저 API")
@Controller("user")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @ApiOperation({ summary: "회원가입" })
  @UseInterceptors(SuccessInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Post("register")
  async create(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @ApiOperation({ summary: "로그인" })
  @UseInterceptors(SuccessInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Post("login")
  login(@Body() data: UserLoginDto) {
    return this.authService.login(data);
  }

  @ApiOperation({ 
    summary: "refresh token으로 access token 재발급", 
    description: "1.access-token은 이미 만료되서 에러 2.jwt-refresh gaurd(refresh-secret) 검증 3.refresh token DB 검증 4.access-token이 리턴됨." })
  @ApiBody({
    description: 'post swagger',
    type: UserLoginDto,
  })
  @UseGuards(JwtRefreshAuthGuard)
  @Post("refreshToken")
  getAccessTokenByRefreshToken(){
    return this.authService.refreshAccessToken();
  }

  // access token 인증된 상태에서 로그아웃 버튼 누르면 redis에 유효기간 저장.
  // validate에서 redis 체크.
  @ApiOperation({ summary: "로그아웃" })
  @UseInterceptors(SuccessInterceptor)
  @UseFilters(HttpExceptionFilter)
  @UseGuards(JwtAuthGuard)
  @Get("logout")
  logout() {
    return this.authService.logout();
  }

  @ApiOperation({ summary: "모든 FCM 토큰 조회" })
  @UseInterceptors(SuccessInterceptor)
  @UseFilters(HttpExceptionFilter)
  @UseGuards(JwtAuthGuard)
  @Get("get/allFcm")
  findAllFCM() {
    return this.usersService.getAllFCM();
  }

  @ApiOperation({ summary: "개인 FCM 토큰 조회" })
  @UseInterceptors(SuccessInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Get("get/fcm/:userIdx")
  findFCM(@Param("userIdx", ParseIntPipe, PositiveIntPipe) userIdx: number) {
    return this.usersService.getFcmByUserIdx(userIdx);
  }

  @ApiOperation({ summary: "인증확인:현재유저 가져오기" })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser(@CurrentUser() user) {
    return user; 
  }
}
