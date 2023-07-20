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
exports.CustomPostQueryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Post_1 = require("../../../resource/db/entities/Post");
const typeorm_2 = require("typeorm");
const User_1 = require("../../../resource/db/entities/User");
const Image_1 = require("../../../resource/db/entities/Image");
const Comment_1 = require("../../../resource/db/entities/Comment");
const LikePost_1 = require("../../../resource/db/entities/LikePost");
let CustomPostQueryRepository = class CustomPostQueryRepository {
    constructor(postRepository, userRepository, imageRepository, commentRepository, likePostRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
        this.commentRepository = commentRepository;
        this.likePostRepository = likePostRepository;
    }
    async findPostsById(userIdx) {
        const posts = await this.postRepository.find({
            where: { userIdx },
        });
        if (posts.length === 0) {
            throw new common_1.BadRequestException({
                statusCode: 2102,
                message: "해당 유저의 게시물이 존재하지 않습니다.",
                result: [],
            });
        }
        return posts;
    }
    async findPostsByCategory(category) {
        const posts = await this.postRepository.find({
            where: { category },
        });
        if (posts.length === 0) {
            throw new common_1.BadRequestException({
                statusCode: 2103,
                message: "해당 카테고리의 게시물이 존재하지 않습니다.",
                result: [],
            });
        }
        return posts;
    }
    async checkTotalPostCountExceeded(page, pageSize) {
        const totalPosts = await this.postRepository.count();
        if (page + pageSize - 1 > 0) {
            throw new common_1.BadRequestException({
                statusCode: 2103,
                message: `전체 게시물 수 ${totalPosts}개를 초과하여 조회할 수 없습니다.`,
                result: {},
            });
        }
    }
    async findPosts(offset, pageSize) {
        const posts = await this.postRepository.find({
            skip: offset,
            take: pageSize,
        });
        return posts;
    }
    async getPostWithImageComment(posts) {
        const result = await Promise.all(posts.map(async (post) => {
            const user = await this.userRepository.findOne({
                where: { userIdx: post.userIdx },
            });
            const nickName = user ? user.nickName : "";
            const images = await this.imageRepository.find({
                where: { postIdx: post.postIdx },
            });
            const imagePath = images.map((image) => image.path);
            const comments = await this.commentRepository.find({
                where: { postIdx: post.postIdx },
            });
            const commentList = comments.map((comment) => comment);
            return Object.assign(Object.assign({}, post), { nickName,
                imagePath,
                commentList });
        }));
        return result;
    }
    async findPostByPostIdx(postIdx) {
        const post = await this.postRepository.findOne({
            where: { postIdx },
        });
        if (!post) {
            throw new common_1.BadRequestException({
                statusCode: 2104,
                message: `postIdx:${postIdx} 에 해당하는 게시물이 없습니다.`,
                result: {},
            });
        }
        return post;
    }
    async checkUserLikedPost(post, userIdx) {
        const likeCount = await this.likePostRepository.count({
            where: { postIdx: post.postIdx, userIdx: userIdx },
        });
        if (likeCount === 0) {
            throw new common_1.BadRequestException({
                statusCode: 2105,
                message: "해당 게시물에 좋아요를 누르지 않은 유저입니다.",
                result: {},
            });
        }
    }
};
CustomPostQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Post_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(Image_1.Image)),
    __param(3, (0, typeorm_1.InjectRepository)(Comment_1.Comment)),
    __param(4, (0, typeorm_1.InjectRepository)(LikePost_1.LikePost)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CustomPostQueryRepository);
exports.CustomPostQueryRepository = CustomPostQueryRepository;
//# sourceMappingURL=post-query.repository.js.map