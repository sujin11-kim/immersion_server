import { Injectable, Req, Res } from "@nestjs/common";
import { LoginImpl } from "../inferface/login-case.implement";
import { UserLoginDto } from "src/users/dto/user-login.dto";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

@Injectable()
export class AuthService {
  constructor(private loginImpl: LoginImpl) {}

  async login(data: UserLoginDto): Promise<any> {
      return await this.loginImpl.getTokenByCase(data.email, data.password, data.loginType, data.token);
  }

  async refreshAccessToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, sub, email } = req.user as JwtPayload & {
      refreshToken: string;
    };

    const user = await this.loginImpl.findByIdAndCheckRT(sub, refreshToken);

    const token = this.loginImpl.getAccessTokens({ sub, email });

    res.cookie('access-token', token.accessToken);
  }

  async logout(): string {
    return await this.loginImpl.setAccessTokenExpired();
  }
}