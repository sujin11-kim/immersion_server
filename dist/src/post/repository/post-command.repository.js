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
exports.CustomPostCommandRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Post_1 = require("../../../resource/db/entities/Post");
const typeorm_2 = require("typeorm");
const User_1 = require("../../../resource/db/entities/User");
const Image_1 = require("../../../resource/db/entities/Image");
let CustomPostCommandRepository = class CustomPostCommandRepository {
    constructor(postRepository, userRepository, imageRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
    }
    async savePost(postInfo, user) {
        const queryRunner = this.postRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        try {
            await queryRunner.startTransaction();
            const post = queryRunner.manager.getRepository(Post_1.Post).create();
            post.userIdx = user.userIdx;
            post.category = postInfo.category;
            post.title = postInfo.title;
            post.content = postInfo.content;
            const maxContentLength = 1000;
            const contentWithoutSpace = post.content.replace(/\s/g, "");
            if (contentWithoutSpace.length > maxContentLength) {
                throw new common_1.BadRequestException({
                    statusCode: 2101,
                    message: "Content length exceeds the maximum allowed limit.",
                    result: {},
                });
            }
            const savedPost = await queryRunner.manager
                .getRepository(Post_1.Post)
                .save(post);
            const imagePromises = postInfo.image.map(async (imagePath) => {
                const image = queryRunner.manager.getRepository(Image_1.Image).create();
                image.postIdx = savedPost.postIdx;
                image.path = imagePath;
                await queryRunner.manager.getRepository(Image_1.Image).save(image);
            });
            await Promise.all(imagePromises);
            await queryRunner.commitTransaction();
            return Object.assign(Object.assign({}, savedPost), { nickName: user.nickName, imagePath: postInfo.image, commentList: [] });
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
CustomPostCommandRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Post_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(Image_1.Image)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CustomPostCommandRepository);
exports.CustomPostCommandRepository = CustomPostCommandRepository;
//# sourceMappingURL=post-command.repository.js.map