"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Post_1 = require("../../resource/db/entities/Post");
const post_controller_1 = require("./controller/post.controller");
const post_service_1 = require("./service/post.service");
const Image_1 = require("../../resource/db/entities/Image");
const aws_service_1 = require("../aop/utils/aws.service");
const User_1 = require("../../resource/db/entities/User");
const Comment_1 = require("../../resource/db/entities/Comment");
const LikePost_1 = require("../../resource/db/entities/LikePost");
let PostModule = class PostModule {
};
PostModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Post_1.Post, Image_1.Image, User_1.User, Comment_1.Comment, LikePost_1.LikePost])],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService, aws_service_1.AwsService],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map