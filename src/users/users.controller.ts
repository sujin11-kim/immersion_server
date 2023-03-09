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

@ApiTags("USERS")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

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

  @Post("/login")
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { id, password } = dto;

    return await this.usersService.login(id, password);
  }
}
