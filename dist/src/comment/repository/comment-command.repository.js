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
exports.CustomCommentCommandRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Post_1 = require("../../../resource/db/entities/Post");
const typeorm_2 = require("typeorm");
const Comment_1 = require("../../../resource/db/entities/Comment");
const LikeComment_1 = require("../../../resource/db/entities/LikeComment");
let CustomCommentCommandRepository = class CustomCommentCommandRepository {
    constructor(postRepository, commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }
    async saveComment(userIdx, createCommentDto) {
        const queryRunner = this.postRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        try {
            await queryRunner.startTransaction();
            const comment = queryRunner.manager.getRepository(Comment_1.Comment).create();
            comment.postIdx = createCommentDto.postIdx;
            comment.parentCommentIdx = createCommentDto.parentCommentIdx;
            comment.userIdx = userIdx;
            comment.commentContent = createCommentDto.commentContent;
            comment.depth = createCommentDto.depth;
            const savedComment = await queryRunner.manager
                .getRepository(Comment_1.Comment)
                .save(comment);
            await queryRunner.commitTransaction();
            return savedComment;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async increaseLikeNUm(userIdx, postIdx, commentIdx) {
        const queryRunner = this.commentRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const editcomment = await queryRunner.manager
                .getRepository(Comment_1.Comment)
                .findOne({ where: { commentIdx } });
            editcomment.likeNum += 1;
            await queryRunner.manager.getRepository(Comment_1.Comment).save(editcomment);
            const likeComment = new LikeComment_1.LikeComment();
            likeComment.commentIdx = commentIdx;
            likeComment.userIdx = userIdx;
            likeComment.postIdx = postIdx;
            await queryRunner.manager.getRepository(LikeComment_1.LikeComment).save(likeComment);
            return editcomment;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async decreaseLikeNUm(userIdx, postIdx, commentIdx) {
        const queryRunner = this.commentRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const editcomment = await queryRunner.manager
                .getRepository(Comment_1.Comment)
                .findOne({ where: { commentIdx } });
            editcomment.likeNum -= 1;
            await queryRunner.manager.getRepository(Comment_1.Comment).save(editcomment);
            const likeComment = new LikeComment_1.LikeComment();
            likeComment.commentIdx = commentIdx;
            likeComment.userIdx = userIdx;
            likeComment.postIdx = postIdx;
            await queryRunner.manager.getRepository(LikeComment_1.LikeComment).save(likeComment);
            return editcomment;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
};
CustomCommentCommandRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Post_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(Comment_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CustomCommentCommandRepository);
exports.CustomCommentCommandRepository = CustomCommentCommandRepository;
//# sourceMappingURL=comment-command.repository.js.map