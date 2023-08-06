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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Comment_1 = require("../../../resource/db/entities/Comment");
const User_1 = require("../../../resource/db/entities/User");
const LikeComment_1 = require("../../../resource/db/entities/LikeComment");
const comment_implement_1 = require("../interface/comment.implement");
let CommentService = class CommentService {
    constructor(commentRepository, dataSource, commentImpl) {
        this.commentRepository = commentRepository;
        this.dataSource = dataSource;
        this.commentImpl = commentImpl;
    }
    async createComment(userIdx, createCommentDto) {
        return await this.commentImpl.createComment(userIdx, createCommentDto);
    }
    async findAllComment(postIdx) {
        return await this.commentImpl.findAllComment(postIdx);
    }
    async commentLike(userIdx, postIdx, commentIdx) {
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
    async postLikeCancel(userIdx, postIdx, commentIdx) {
        const queryRunner = this.commentRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const editcomment = await queryRunner.manager
                .getRepository(Comment_1.Comment)
                .findOne({ where: { commentIdx } });
            if (editcomment.likeNum > 0) {
                editcomment.likeNum -= 1;
            }
            await queryRunner.manager.getRepository(Comment_1.Comment).save(editcomment);
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
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Comment_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        comment_implement_1.CommentImpl])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map