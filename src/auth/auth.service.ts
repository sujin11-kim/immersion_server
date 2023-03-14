import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { User } from "mymodel/entities/user.entity";
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

    //* password가 일치한지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password
    );

    const payload = { id: id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
