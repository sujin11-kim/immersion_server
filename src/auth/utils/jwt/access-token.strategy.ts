import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { CustomUserQueryRepository } from 'src/users/repository/user-query.repository';
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { ExtractJwt } from "passport-jwt";

@Injectable()
export class ATStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly customUserQueryRepository: CustomUserQueryRepository,
    private readonly errorResponse: ErrorResponse
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload) {
    const { userIdx } = payload;
    const user = await this.customUserQueryRepository.getByUserIdx(userIdx);
    
    if (!user) this.errorResponse.notAuthorizationLogin();

    // redis 에서 비교하는 거
    if(await checkATExpiredTime())
    
    return user;
  }
}