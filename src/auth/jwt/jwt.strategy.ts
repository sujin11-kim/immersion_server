import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "mymodel/entities/user.entity";
import { Payload } from "./jwt.patloads";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secretKey",
      ignoreExpiration: false,
    });
  }

  //     async validate(payload: Payload) {
  //        const user=await this.userRepository.
  //    }
}
