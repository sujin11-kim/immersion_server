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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const ChatUser_1 = require("./ChatUser");
const LikePost_1 = require("./LikePost");
const Restaurant_1 = require("./Restaurant");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "userIdx" }),
    __metadata("design:type", Number)
], User.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "email", unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nickName", nullable: true, length: 20 }),
    __metadata("design:type", String)
], User.prototype, "nickName", void 0);
__decorate([
    (0, typeorm_1.Column)("char", { name: "phone", nullable: true, length: 11 }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "fcmtoken", nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "fcmtoken", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "refreshToken", nullable: true, length: 1000 }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "enrollDate", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "password", nullable: true, length: 300 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("double", {
        name: "latitude",
        nullable: true,
        precision: 22,
        default: () => "'0'",
    }),
    __metadata("design:type", Number)
], User.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)("double", {
        name: "longitude",
        nullable: true,
        precision: 22,
        default: () => "'0'",
    }),
    __metadata("design:type", Number)
], User.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ChatUser_1.ChatUser, (chatUser) => chatUser.userIdx2),
    __metadata("design:type", Array)
], User.prototype, "chatUsers", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => LikePost_1.LikePost, (likePost) => likePost.userIdx2),
    __metadata("design:type", LikePost_1.LikePost)
], User.prototype, "likePost", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Restaurant_1.Restaurant, (restaurant) => restaurant.userIdx2),
    __metadata("design:type", Array)
], User.prototype, "restaurants", void 0);
User = __decorate([
    (0, typeorm_1.Index)("User_id_uindex", ["email"], { unique: true }),
    (0, typeorm_1.Index)("User_userIdx_uindex", ["userIdx"], { unique: true }),
    (0, typeorm_1.Entity)("User", { schema: "immersion_DB" })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map