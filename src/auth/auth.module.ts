import { TypeOrmModule } from "@nestjs/typeorm";
import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { User } from "resource/db/entities/User";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/service/users.service";
import { LocalLoginStrategy } from "./inferface/local-login.implement";
import { KakaoLoginStrategy } from "./inferface/kakao-login.implement";
import { AppleLoginStrategy } from "./inferface/apple-login.implement";
import { LoginImpl } from "./inferface/login-case.implement";
import { CustomUserQueryRepository } from "src/users/repository/user-query.repository";
import { CustomUserCommandRepository } from "src/users/repository/user-command.repository";
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { JwtStrategy } from "./utils/jwt/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "3m" },
    }),

    forwardRef(() => UsersModule),
  ],
  providers: [
    AuthService, 
    LoginImpl,
    JwtStrategy,
    LocalLoginStrategy, 
    KakaoLoginStrategy, 
    AppleLoginStrategy,
    CustomUserCommandRepository,
    CustomUserQueryRepository,
    ErrorResponse
  ],
  exports: [AuthModule, AuthService],
})
export class AuthModule {}
