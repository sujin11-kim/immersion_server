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
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';


@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
    ) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('register')
  async create(@Body() data: CreateUserDto) {
    const checkExistUser = this.usersService.findById(data.id);
    if (!checkExistUser) {
      throw new NotFoundException();
    }
    const result = await this.usersService.create(
      data.id,
      data.nickname,
      data.phone,
      data.password
    );
    if (result) {
      return 'success';
    } else {
      throw new ForbiddenException();
    }
  }

  @UseGuards(AuthGuard('local'))
	@Post('login')
	async login(@Session() session, @Request() req, @Res({ passthrough: true}) response) {
		const access_token = await (await this.authService.login(req.user)).access_token;
		await response.cookie('Authorization', access_token);
		return req.user;
	}
}