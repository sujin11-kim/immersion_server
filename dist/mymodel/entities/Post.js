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
exports.Post = void 0;
const typeorm_1 = require("typeorm");
const Comment_1 = require("./Comment");
const LikePost_1 = require("./LikePost");
const moment = require("moment");
let Post = class Post {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "postIdx" }),
    __metadata("design:type", Number)
], Post.prototype, "postIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "userIdx" }),
    __metadata("design:type", Number)
], Post.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "category", nullable: true, length: 20 }),
    __metadata("design:type", String)
], Post.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "title", nullable: true, length: 30 }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "content", nullable: true, length: 300 }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        transformer: {
            to(value) {
                return moment(value).format("YYYY-MM-DD HH:mm");
            },
            from(value) {
                return moment(value).format("YYYY-MM-DD HH:mm");
            },
        },
    }),
    __metadata("design:type", String)
], Post.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
        transformer: {
            to(value) {
                return moment(value).format("YYYY-MM-DD HH:mm");
            },
            from(value) {
                return moment(value).format("YYYY-MM-DD HH:mm");
            },
        },
    }),
    __metadata("design:type", String)
], Post.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "likeNum", nullable: true }),
    __metadata("design:type", Number)
], Post.prototype, "likeNum", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "viewNum", nullable: true }),
    __metadata("design:type", Number)
], Post.prototype, "viewNum", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, (comment) => comment.postIdx2),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LikePost_1.LikePost, (likePost) => likePost.postIdx2),
    __metadata("design:type", Array)
], Post.prototype, "likePosts", void 0);
Post = __decorate([
    (0, typeorm_1.Index)("Post_postIdx_uindex", ["postIdx"], { unique: true }),
    (0, typeorm_1.Entity)("Post", { schema: "immersion_DB" })
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map