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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentImpl = void 0;
const common_1 = require("@nestjs/common");
const comment_command_repository_1 = require("../repository/comment-command.repository");
const comment_query_repository_1 = require("../repository/comment-query.repository");
let CommentImpl = class CommentImpl {
    constructor(customCommentCommandRrepository, customCommentQueryRrepository) {
        this.customCommentCommandRrepository = customCommentCommandRrepository;
        this.customCommentQueryRrepository = customCommentQueryRrepository;
    }
    async createComment(userIdx, createCommentDto) {
        await this.customCommentQueryRrepository.isPostExist(createCommentDto.postIdx);
        const nickName = await this.customCommentQueryRrepository.findNickName(userIdx);
        const savedComment = await this.customCommentCommandRrepository.saveComment(userIdx, createCommentDto);
        return Object.assign(Object.assign({}, savedComment), { nickName });
    }
    async findAllComment(postIdx) {
        await this.customCommentQueryRrepository.isPostExist(postIdx);
        return await this.customCommentQueryRrepository.findCommentByPostIdx(postIdx);
    }
};
CommentImpl = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comment_command_repository_1.CustomCommentCommandRepository,
        comment_query_repository_1.CustomCommentQueryRepository])
], CommentImpl);
exports.CommentImpl = CommentImpl;
//# sourceMappingURL=comment.implement.js.map