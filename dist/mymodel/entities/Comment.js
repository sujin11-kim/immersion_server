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
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("./Post");
const moment = require("moment");
const LikeComment_1 = require("./LikeComment");
let Comment = class Comment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "commentIdx" }),
    __metadata("design:type", Number)
], Comment.prototype, "commentIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { primary: true, name: "postIdx" }),
    __metadata("design:type", Number)
], Comment.prototype, "postIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "userIdx" }),
    __metadata("design:type", Number)
], Comment.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "parentCommentIdx", nullable: true }),
    __metadata("design:type", Number)
], Comment.prototype, "parentCommentIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "depth", nullable: true }),
    __metadata("design:type", Number)
], Comment.prototype, "depth", void 0);
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
], Comment.prototype, "commentAt", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "commentContent", nullable: true, length: 500 }),
    __metadata("design:type", String)
], Comment.prototype, "commentContent", void 0);
__decorate([
    (0, typeorm_1.Column)("bool", { name: "isDeleted", nullable: true }),
    __metadata("design:type", Boolean)
], Comment.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "likeNum", nullable: true }),
    __metadata("design:type", Number)
], Comment.prototype, "likeNum", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post_1.Post, (post) => post.comments, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "postIdx", referencedColumnName: "postIdx" }]),
    __metadata("design:type", Post_1.Post)
], Comment.prototype, "postIdx2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LikeComment_1.LikeComment, (likeComment) => likeComment.commentIdx2),
    __metadata("design:type", Array)
], Comment.prototype, "likeComments", void 0);
Comment = __decorate([
    (0, typeorm_1.Index)("Comment_commentIdx_uindex", ["commentIdx"], { unique: true }),
    (0, typeorm_1.Index)("FK_Post_TO_Comment_1", ["postIdx"], {}),
    (0, typeorm_1.Entity)("Comment", { schema: "immersion_DB" })
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map