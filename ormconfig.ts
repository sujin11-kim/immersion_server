import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./resource/db/entities/User";

import { ChatRoom } from "./resource/db/entities/ChatRoom";
import { ChatUser } from "./resource/db/entities/ChatUser";
import { Comment } from "./resource/db/entities/Comment";
import { LikePost } from "./resource/db/entities/LikePost";
import { Post } from "./resource/db/entities/Post";
import { Message } from "./resource/db/entities/Message";
// import { Post } from "@nestjs/common";

dotenv.config();

const dataSource = new DataSource({
  type: "mysql",
  host: "immersion.cjnozrqfl9r8.ap-northeast-2.rds.amazonaws.com",
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "immersion_DB",
  entities: [User, ChatRoom, ChatUser, Comment, LikePost, Post, Message],
  migrations: [__dirname + "/src/migrations/*.ts"],
  charset: "utf8mb4",
  synchronize: false,
  logging: true,
});

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default dataSource;
