"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_controller_1 = require("./controller/comment.controller");
const comment_service_1 = require("./service/comment.service");
const Comment_1 = require("../../resource/db/entities/Comment");
const User_1 = require("../../resource/db/entities/User");
const Post_1 = require("../../resource/db/entities/Post");
const LikeComment_1 = require("../../resource/db/entities/LikeComment");
const comment_command_repository_1 = require("./repository/comment-command.repository");
const comment_query_repository_1 = require("./repository/comment-query.repository");
const comment_implement_1 = require("./interface/comment.implement");
const error_reponse_1 = require("../aop/exception/error-reponse");
let CommentModule = class CommentModule {
};
CommentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Comment_1.Comment, User_1.User, Post_1.Post, LikeComment_1.LikeComment])],
        controllers: [comment_controller_1.CommentController],
        providers: [
            comment_service_1.CommentService,
            comment_command_repository_1.CustomCommentCommandRepository,
            comment_query_repository_1.CustomCommentQueryRepository,
            comment_implement_1.CommentImpl,
            error_reponse_1.ErrorResponse
        ],
    })
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comment.module.js.map