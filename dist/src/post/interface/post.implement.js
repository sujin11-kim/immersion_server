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
exports.PostImpl = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Post_1 = require("../../../resource/db/entities/Post");
const Image_1 = require("../../../resource/db/entities/Image");
const typeorm_2 = require("typeorm");
const post_query_repository_1 = require("../repository/post-query.repository");
const post_command_repository_1 = require("../repository/post-command.repository");
let PostImpl = class PostImpl {
    constructor(customPostCommandRrepository, customPostQueryRrepository, postEntityRepository, imageEntityRepository) {
        this.customPostCommandRrepository = customPostCommandRrepository;
        this.customPostQueryRrepository = customPostQueryRrepository;
        this.postEntityRepository = postEntityRepository;
        this.imageEntityRepository = imageEntityRepository;
    }
    async createPost(user, postInfo) {
        postInfo.content = postInfo.content.replace(/[\u{1F600}-\u{1F6FF}]/gu, "");
        return await this.customPostCommandRrepository.savePost(postInfo, user);
    }
    async findIdPost(userIdx) {
        const posts = await this.customPostQueryRrepository.findPostsById(userIdx);
        return await this.customPostQueryRrepository.getPostWithImageComment(posts);
    }
    async findCategoryPost(category) {
        const posts = await this.customPostQueryRrepository.findPostsByCategory(category);
        return await this.customPostQueryRrepository.getPostWithImageComment(posts);
    }
    async findAll(page, pageSize) {
        await this.customPostQueryRrepository.checkTotalPostCountExceeded(page, pageSize);
        const offset = (page - 1) * pageSize;
        const posts = await this.customPostQueryRrepository.findPosts(offset, pageSize);
        const postWithImageComment = await this.customPostQueryRrepository.getPostWithImageComment(posts);
        return postWithImageComment;
    }
    async postLike(user, postIdx) {
        const post = await this.customPostQueryRrepository.findPostByPostIdx(postIdx);
        const editpost = await this.customPostCommandRrepository.increaseLikeNum(post, user);
        const result = await this.customPostQueryRrepository.getPostWithImageComment([editpost]);
        return result[0];
    }
    async postLikeCancel(user, postIdx) {
        const post = await this.customPostQueryRrepository.findPostByPostIdx(postIdx);
        await this.customPostQueryRrepository.checkUserLikedPost(post, user.userIdx);
        const editpost = await this.customPostCommandRrepository.decreaseLikeNum(post, user);
        const result = await this.customPostQueryRrepository.getPostWithImageComment([editpost]);
        return result[0];
    }
};
PostImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(Post_1.Post)),
    __param(3, (0, typeorm_1.InjectRepository)(Image_1.Image)),
    __metadata("design:paramtypes", [post_command_repository_1.CustomPostCommandRepository,
        post_query_repository_1.CustomPostQueryRepository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostImpl);
exports.PostImpl = PostImpl;
//# sourceMappingURL=post.implement.js.map