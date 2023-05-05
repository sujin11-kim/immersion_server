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
exports.Image = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("./Post");
let Image = class Image {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "imageIdx" }),
    __metadata("design:type", Number)
], Image.prototype, "imageIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "postIdx" }),
    __metadata("design:type", Number)
], Image.prototype, "postIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "path", length: 100 }),
    __metadata("design:type", String)
], Image.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "imageName", length: 255 }),
    __metadata("design:type", String)
], Image.prototype, "imageName", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "size" }),
    __metadata("design:type", Number)
], Image.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Type", length: 100 }),
    __metadata("design:type", String)
], Image.prototype, "Type", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "imageKey", length: 100 }),
    __metadata("design:type", String)
], Image.prototype, "imageKey", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post_1.Post, (post) => post.postIdx, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "postIdx", referencedColumnName: "postIdx" }]),
    __metadata("design:type", Post_1.Post)
], Image.prototype, "postIdx2", void 0);
Image = __decorate([
    (0, typeorm_1.Entity)("Image", { schema: "immersion_DB" })
], Image);
exports.Image = Image;
//# sourceMappingURL=Image.js.map