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
import { UsersService } from "./users.service";

@ApiTags("USERS")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "회원가입" })
  @Post("register")
  async create(@Body() data: CreateUserDto) {
    // const checkExistUser = this.usersService.findById(data.ID);
    // if (!checkExistUser) {
    //   throw new NotFoundException();
    // }
    const result = await this.usersService.create(
      data.id,
      data.nickname,
      data.phone,
      data.favorite,
      data.enrolldate,
      data.regflag,
      data.password,
      data.type
    );
    if (result) {
      return "success";
    } else {
      throw new ForbiddenException();
    }
  }

  @Post("/login")
  async login(@Body() dto: User);
}
