import { Injectable } from "@nestjs/common";
import { LoginImpl } from "../inferface/login-case.implement";
import { UserLoginDto } from "src/users/dto/user-login.dto";

@Injectable()
export class AuthService {
  constructor(private loginImpl: LoginImpl) {}

  async login(data: UserLoginDto): Promise<any> {
      return await this.loginImpl.getTokenByCase(data.email, data.password, data.loginType, data.token);
  }
}