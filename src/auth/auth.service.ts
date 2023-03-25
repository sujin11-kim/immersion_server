import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "mymodel/entities/User";
import { Repository } from "typeorm";
import { LoginRequestDto } from "./dto/login.request.dto";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const curr = new Date();
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 18 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);

    const { id, password } = data;

    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        {
          isSuccess: true,
          code: 200,
          data: {
            token: "",
          },
          kr_curr,
        },
        200
      );
    }

    //* password가 일치한지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password
    );

    const payload = { id };

    if (user && (await bcrypt.compare(password, user.password))) {
      throw new HttpException(
        {
          isSuccess: true,
          code: 200,
          data: {
            token: this.jwtService.sign(payload),
          },
          kr_curr,
        },
        200
      );
    } else {
      throw new HttpException(
        {
          isSuccess: true,
          code: 200,
          data: {
            token: "",
          },
          kr_curr,
        },
        200
      );
    }
  }
}
