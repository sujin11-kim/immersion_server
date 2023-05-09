"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const User_1 = require("../mymodel/entities/User");
const auth_module_1 = require("./auth/auth.module");
const Message_1 = require("../mymodel/entities/Message");
const Post_1 = require("../mymodel/entities/Post");
const LikePost_1 = require("../mymodel/entities/LikePost");
const Comment_1 = require("../mymodel/entities/Comment");
const ChatUser_1 = require("../mymodel/entities/ChatUser");
const ChatRoom_1 = require("../mymodel/entities/ChatRoom");
const post_module_1 = require("./post/post.module");
const comment_module_1 = require("./comment/comment.module");
const Image_1 = require("../mymodel/entities/Image");
const aws_service_1 = require("./aws.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([User_1.User]),
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: process.env.DB_HOST,
                port: 3306,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [
                    User_1.User,
                    Post_1.Post,
                    Message_1.Message,
                    LikePost_1.LikePost,
                    Comment_1.Comment,
                    ChatUser_1.ChatUser,
                    ChatRoom_1.ChatRoom,
                    Image_1.Image,
                ],
                autoLoadEntities: true,
                keepConnectionAlive: true,
                migrations: [__dirname + "/migrations/*.ts"],
                charset: "utf8mb4_general_ci",
                synchronize: false,
                logging: true,
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            post_module_1.PostModule,
            comment_module_1.CommentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, aws_service_1.AwsService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map