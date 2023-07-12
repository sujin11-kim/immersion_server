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
exports.LikeComment = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("./Post");
const User_1 = require("./User");
const Comment_1 = require("./Comment");
let LikeComment = class LikeComment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "commentlikeIdx" }),
    __metadata("design:type", Number)
], LikeComment.prototype, "commentlikeIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "userIdx" }),
    __metadata("design:type", Number)
], LikeComment.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "postIdx" }),
    __metadata("design:type", Number)
], LikeComment.prototype, "postIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "commentIdx" }),
    __metadata("design:type", Number)
], LikeComment.prototype, "commentIdx", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post_1.Post, (post) => post.likePosts, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "postIdx", referencedColumnName: "postIdx" }]),
    __metadata("design:type", Post_1.Post)
], LikeComment.prototype, "postIdx2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.likePost, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "userIdx", referencedColumnName: "userIdx" }]),
    __metadata("design:type", User_1.User)
], LikeComment.prototype, "userIdx2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Comment_1.Comment, (comment) => comment.likeComments),
    (0, typeorm_1.JoinColumn)([{ name: "commentIdx", referencedColumnName: "commentIdx" }]),
    __metadata("design:type", Comment_1.Comment)
], LikeComment.prototype, "commentIdx2", void 0);
LikeComment = __decorate([
    (0, typeorm_1.Entity)("LikeComment", { schema: "immersion_DB" })
], LikeComment);
exports.LikeComment = LikeComment;
//# sourceMappingURL=LikeComment.js.map