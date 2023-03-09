import { TypeOrmModule } from "@nestjs/typeorm";
import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "mymodel/entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { JwtStrategy } from "./jwt/jwt.strategy";
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "jwt", session: false }),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1y" },
    }),

    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthModule, AuthService],
})
export class AuthModule {}
