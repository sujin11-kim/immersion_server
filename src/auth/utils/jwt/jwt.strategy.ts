import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CustomUserQueryRepository } from 'src/users/repository/user-query.repository';
import { Payload } from "./jwt.payloads";
import * as jwt from 'jsonwebtoken';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ErrorResponse } from "src/aop/exception/error-reponse";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly customUserQueryRepository: CustomUserQueryRepository,
    private readonly errorResponse: ErrorResponse
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: true,
    });
  }

  async validate(payload) {
    const { userIdx } = payload;
    const user = await this.customUserQueryRepository.getByUserIdx(userIdx);
    
    if (!user) this.errorResponse.notAuthorizationLogin();
    
    return user;
  }
}