import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { User } from "mymodel/entities/User";
import { AuthModule } from "./auth/auth.module";

import * as moment from "moment";
import { Message } from "mymodel/entities/Message";
import { Post } from "mymodel/entities/Post";
import { LikePost } from "mymodel/entities/LikePost";
import { Comment } from "mymodel/entities/Comment";
import { ChatUser } from "mymodel/entities/ChatUser";
import { ChatRoom } from "mymodel/entities/ChatRoom";
import { PostModule } from "./post/post.module";
import { CommentModule } from "./comment/comment.module";
import { Image } from "mymodel/entities/Image";
import { AwsService } from "./aws.service";
import { Restaurant } from "mymodel/entities/Restaurant";
import { RestaurantsModule } from "./restaurants/restaurants.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: Joi.object({
      //   DB_HOST: Joi.string().required(),
      //   DB_USERNAME: Joi.string().required(),
      //   DB_PASSWORD: Joi.string().required(),
      //   DB_DATABASE: Joi.string().required(),
      // })
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Post,
        Message,
        LikePost,
        Comment,
        ChatUser,
        ChatRoom,
        Image,
        Restaurant,
      ],
      autoLoadEntities: true,
      keepConnectionAlive: true,
      migrations: [__dirname + "/migrations/*.ts"],
      charset: "utf8mb4_general_ci",
      synchronize: false,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    PostModule,
    CommentModule,
    RestaurantsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AwsService],
})
@Global()
export class AppModule {
  constructor() {
    moment.locale("en"); // 원하는 로캘을 선택하여 Moment.js의 언어 설정을 변경할 수 있습니다.
  }
}
