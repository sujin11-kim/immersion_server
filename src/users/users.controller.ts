import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
  Request,
  Get,
  Res,
  Session,
  ForbiddenException,
} from "@nestjs/common";
import { ApiCookieAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";
import { AuthService } from "src/auth/auth.service";
import { LoginRequestDto } from "src/auth/dto/login.request.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";

@ApiTags("USERS")
@Controller("users")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @ApiOperation({ summary: "회원가입" })
  @Post("register")
  async create(@Body() dto: CreateUserDto): Promise<void> {
    const {
      id,
      nickname,
      phone,
      favorite,
      enrolldate,
      regflag,
      password,
      type,
    } = dto;
    await this.usersService.create(
      id,
      nickname,
      phone,
      favorite,
      enrolldate,
      regflag,
      password,
      type
    );
  }

  @ApiOperation({ summary: "로그인" })
  @Post("login")
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: "인증확인:현재유저 가져오기" })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser() {
    return "curret user";
  }
}
