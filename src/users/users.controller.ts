import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Headers
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { AuthService } from "src/auth/auth.service";
import { LoginRequestDto } from "src/auth/dto/login.request.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { CurrentUser } from "src/common/decorators/user.decorator";
import { UseInterceptors } from "@nestjs/common/decorators/core/use-interceptors.decorator";
import { SuccessInterceptor } from "src/common/interceptors/success.interceptor";
import { UseFilters } from "@nestjs/common/decorators/core/exception-filters.decorator";
import { HttpExceptionFilter } from "src/common/exception/http-exception.filter";
import { RegisterSuccessInterceptor } from "src/common/interceptors/register.success.interceptor";
import { RegisterHttpExceptionFilter } from "src/common/exception/register.http-exceptoin.filter";
import { UserLoginDto } from "./dto/user-login.dto";

@ApiTags("USERS")
@Controller("users")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @ApiOperation({ summary: "회원가입" })
  @UseInterceptors(RegisterSuccessInterceptor)
  @UseFilters(RegisterHttpExceptionFilter)
  @Post("register")
  async create(@Body() dto: CreateUserDto) {
    const { email, nickName, phone, password } = dto;
    return await this.usersService.create(email, nickName, phone, password);
  }

  @ApiOperation({ summary: "로그인" })
  @UseInterceptors(SuccessInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Post("login")
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }


  @ApiOperation({ summary: "FCM 토큰 추가" })
  @UseInterceptors(SuccessInterceptor)
  @UseFilters(HttpExceptionFilter)
  @UseGuards(JwtAuthGuard)
  @Post("save/fcm")
  saveFCMToken(
    @CurrentUser() user: UserLoginDto,
    @Body("fcmToken") fcmToken: string
  ) {
    return this.usersService.saveFCMToken(user, fcmToken);
  }

  @ApiOperation({ summary: "모든 FCM 토큰 조회" })
  @UseInterceptors(SuccessInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Get("get/fcm")
  findFCM() {
    return this.usersService.findFCM();
  }

  @ApiOperation({ summary: "카카오로그인" })
  @UseInterceptors(SuccessInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Get("kakaologin")
  kakaoLogin(@Headers('Authorization') customHeader: string) {
    return this.authService.kakaoTokenToLocalToken(customHeader);
  }

  @ApiOperation({ summary: "인증확인:현재유저 가져오기" })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser(@CurrentUser() user) {
    return user;
  }
}
