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
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../dto/create-user.dto";
import { UsersService } from "../service/users.service";
import { AuthService } from "src/auth/auth.service";
import { LoginRequestDto } from "src/auth/dto/login.request.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { CurrentUser } from "../../aop/decorators/user.decorator";
import { UseInterceptors } from "@nestjs/common/decorators/core/use-interceptors.decorator";
import { SuccessInterceptor } from "../../aop/interceptors/success.interceptor";
import { UseFilters } from "@nestjs/common/decorators/core/exception-filters.decorator";
import { HttpExceptionFilter } from "../../aop/exception/http-exception.filter";
import { UserLoginDto } from "../dto/user-login.dto";
import { PositiveIntPipe } from "src/aop/pipes/positiveInt.pipe";

@ApiTags("USERS")
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
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: "모든 FCM 토큰 조회" })
  @UseInterceptors(SuccessInterceptor)
  @UseFilters(HttpExceptionFilter)
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

  @ApiOperation({ summary: "카카오로그인" })
  @UseInterceptors(SuccessInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Get("kakaologin")
  kakaoLogin(@Headers("Authorization") customHeader: string) {
    return this.authService.kakaoTokenToLocalToken(customHeader);
  }

  @ApiOperation({ summary: "인증확인:현재유저 가져오기" })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser(@CurrentUser() user) {
    return user;
  }
}
