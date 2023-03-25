import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "mymodel/entities/User";
import { Payload } from "./jwt.patloads";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secretKey",
      ignoreExpiration: false,
    });
  }

  async validate(payload) {
    const { id } = payload;
    const user: User = await this.userRepository.findOneBy({ id });

    if (user) {
      return user; // request.user
    } else {
      throw new UnauthorizedException("jset_strategy접근 오류");
    }
  }
}
