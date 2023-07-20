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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const post_implement_1 = require("../interface/post.implement");
let PostService = class PostService {
    constructor(postImpl) {
        this.postImpl = postImpl;
    }
    async createPost(user, postInfo) {
        return await this.postImpl.createPost(user, postInfo);
    }
    async findIdPost(userIdx) {
        return await this.postImpl.findIdPost(userIdx);
    }
    async findCategoryPost(category) {
        return await this.postImpl.findCategoryPost(category);
    }
    async findAll(page, pageSize) {
        return await this.postImpl.findAll(page, pageSize);
    }
    async postLike(user, postIdx) {
        return await this.postImpl.postLike(user, postIdx);
    }
    async postLikeCancel(user, postIdx) {
        return await this.postImpl.postLikeCancel(user, postIdx);
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [post_implement_1.PostImpl])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map