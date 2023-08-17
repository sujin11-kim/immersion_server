import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken
} from "@nestjs/typeorm";
import { User } from "../../resource/db/entities/User";
import { UsersService } from "./service/users.service";
import { UsersController } from "./controller/users.controller";
import { AuthModule } from "src/auth/auth.module";
import { UserImpl } from "./interface/user.implement";
import { CustomUserCommandRepository } from "./repository/user-command.repository";
import { CustomUserQueryRepository } from "./repository/user-query.repository";
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { DataSource } from "typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [
    {
      provide: getRepositoryToken(User),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // 기존 repository를 custom 버전으로 overriding
        return dataSource
          .getRepository(User)
          .extend(CustomUserCommandRepository);
      },
    },
    UsersService,
    UserImpl,
    // CustomUserCommandRepository,
    CustomUserQueryRepository,
    ErrorResponse
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}


