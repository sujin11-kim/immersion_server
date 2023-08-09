import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { CustomUserQueryRepository } from 'src/users/repository/user-query.repository';
import { Payload } from "./jwt.payloads";
import { ErrorResponse } from "src/aop/exception/error-reponse";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly customUserQueryRepository: CustomUserQueryRepository,
    private readonly errorResponse: ErrorResponse
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secretKey",
      ignoreExpiration: true,
    });
  }

  async validate(payload: Payload) {
    const { userIdx } = payload;
    const user = await this.customUserQueryRepository.getByUserIdx(userIdx);

    if (!user) {
      this.errorResponse.notAuthorizationLogin();
    }
    else return user;
  }
}