import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../resource/db/entities/User";
import { UsersService } from "./service/users.service";
import { UsersController } from "./controller/users.controller";
import { AuthModule } from "src/auth/auth.module";
import { UserImpl } from "./interface/user.implement";
import { CustomUserRepository } from "./repository/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UsersService, UserImpl, CustomUserRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
