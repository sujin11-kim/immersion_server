"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCommentQueryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Post_1 = require("../../../resource/db/entities/Post");
const typeorm_2 = require("typeorm");
const User_1 = require("../../../resource/db/entities/User");
const Comment_1 = require("../../../resource/db/entities/Comment");
const custom_exception_1 = require("../../aop/exception/custom-exception");
let CustomCommentQueryRepository = class CustomCommentQueryRepository {
    constructor(postRepository, userRepository, commentRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }
    async isPostExist(postIdx) {
        const post = await this.postRepository.findOne({
            where: { postIdx: postIdx },
        });
        if (!post) {
            throw new common_1.BadRequestException(custom_exception_1.CustomExceptions.NOT_FOUNT_POST);
        }
    }
    async findNickName(userIdx) {
        const user = await this.userRepository.findOne({
            where: { userIdx: userIdx },
        });
        return user.nickName;
    }
    async findCommentByPostIdx(postIdx) {
        const comments = await this.commentRepository
            .createQueryBuilder("comment")
            .innerJoinAndSelect("comment.user", "user")
            .where("comment.postIdx = :postIdx", { postIdx })
            .select([
            "comment.commentIdx",
            "comment.postIdx",
            "comment.parentCommentIdx",
            "comment.depth",
            "comment.commentAt",
            "comment.commentContent",
            "comment.isDeleted",
            "comment.userIdx",
            "user.nickName",
        ])
            .getMany();
        if (comments.length === 0) {
            throw new common_1.BadRequestException(custom_exception_1.CustomExceptions.NOT_FOUND_COMMENT);
        }
        const result = comments.map((comment) => ({
            commentIdx: comment.commentIdx,
            postIdx: comment.postIdx,
            parentCommentIdx: comment.parentCommentIdx,
            depth: comment.depth,
            commentAt: comment.commentAt,
            commentContent: comment.commentContent,
            isDeleted: comment.isDeleted,
            userIdx: comment.userIdx,
            nickName: comment.user.nickName,
        }));
        return result;
    }
};
CustomCommentQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Post_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(Comment_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CustomCommentQueryRepository);
exports.CustomCommentQueryRepository = CustomCommentQueryRepository;
//# sourceMappingURL=comment-query.repository.js.map