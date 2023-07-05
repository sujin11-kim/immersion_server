"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const User_1 = require("./mymodel/entities/User");
const ChatRoom_1 = require("./mymodel/entities/ChatRoom");
const ChatUser_1 = require("./mymodel/entities/ChatUser");
const Comment_1 = require("./mymodel/entities/Comment");
const LikePost_1 = require("./mymodel/entities/LikePost");
const Post_1 = require("./mymodel/entities/Post");
const Message_1 = require("./mymodel/entities/Message");
dotenv.config();
const dataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "immersion.cjnozrqfl9r8.ap-northeast-2.rds.amazonaws.com",
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "immersion_DB",
    entities: [User_1.User, ChatRoom_1.ChatRoom, ChatUser_1.ChatUser, Comment_1.Comment, LikePost_1.LikePost, Post_1.Post, Message_1.Message],
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
exports.default = dataSource;
//# sourceMappingURL=ormconfig.js.map