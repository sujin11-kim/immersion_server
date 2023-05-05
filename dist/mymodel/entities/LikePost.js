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
exports.LikePost = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("./Post");
const User_1 = require("./User");
let LikePost = class LikePost {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "likeIdx" }),
    __metadata("design:type", Number)
], LikePost.prototype, "likeIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "userId" }),
    __metadata("design:type", Number)
], LikePost.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "postIdx" }),
    __metadata("design:type", Number)
], LikePost.prototype, "postIdx", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post_1.Post, (post) => post.likePosts, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "postIdx", referencedColumnName: "postIdx" }]),
    __metadata("design:type", Post_1.Post)
], LikePost.prototype, "postIdx2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.likePost, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "userId", referencedColumnName: "id" }]),
    __metadata("design:type", User_1.User)
], LikePost.prototype, "userId2", void 0);
LikePost = __decorate([
    (0, typeorm_1.Index)("FK_Post_TO_LikePost_1", ["postIdx"], {}),
    (0, typeorm_1.Entity)("LikePost", { schema: "immersion_DB" })
], LikePost);
exports.LikePost = LikePost;
//# sourceMappingURL=LikePost.js.map