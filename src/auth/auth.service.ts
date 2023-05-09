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
    const { id, password } = data;

    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException({ token: "" }, 201);
    }

    //* password가 일치한지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password
    );

    const payload = { id };

    if (user && (await bcrypt.compare(password, user.password))) {
      return { token: this.jwtService.sign(payload) };
    } else {
      throw new HttpException({ token: "" }, 201);
    }
  }
}
