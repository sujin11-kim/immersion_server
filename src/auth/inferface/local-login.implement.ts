import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { CustomUserQueryRepository } from "src/users/repository/user-query.repository";
import { ErrorResponse } from "src/aop/exception/error-reponse";

@Injectable()
export class LocalLoginStrategy {
  
  private email_: string;
  private password_: string | null;
  private userIdx_: number | null;
  constructor(
    private readonly jwtService: JwtService,
    private readonly customUserQueryRepository: CustomUserQueryRepository,
    private readonly errorResponse: ErrorResponse
  ) {}
  
  public setter(email: string, password: string){
    this.email_ = email;
    this.password_ = password;
  }

  public async getLocalToken() {
    const user = await this.customUserQueryRepository.getByEmail(this.email_);
    
    if(!user) this.errorResponse.notExistUser();
    
    if(! await bcrypt.compare(this.password_, user.password))
    {
      this.userIdx_ = user.userIdx;
      const payload = { userIdx: this.userIdx_ };
      return { token: this.jwtService.sign(payload) };
    }
    else this.errorResponse.comparePassword(user.password);
  }
}

