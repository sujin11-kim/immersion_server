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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Post_1 = require("../../mymodel/entities/Post");
let PostService = class PostService {
    constructor(postRepository, dataSource) {
        this.postRepository = postRepository;
        this.dataSource = dataSource;
    }
    async createPost(title, content) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const post = new Post_1.Post();
            post.title = title;
            post.content = content;
            const savedPost = await queryRunner.manager.save(post);
            await queryRunner.commitTransaction();
            return savedPost;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            return await queryRunner.manager.find(Post_1.Post);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findOne(writeIdx) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            return await queryRunner.manager.findOne(Post_1.Post, { relations: ["writeIdx"] });
        }
        finally {
            await queryRunner.release();
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Post_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map