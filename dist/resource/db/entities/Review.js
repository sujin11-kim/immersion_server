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
exports.Review = void 0;
const typeorm_1 = require("typeorm");
const ReviewImage_1 = require("./ReviewImage");
const ReviewComment_1 = require("./ReviewComment");
let Review = class Review {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "reviewIdx" }),
    __metadata("design:type", Number)
], Review.prototype, "reviewIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "userIdx" }),
    __metadata("design:type", Number)
], Review.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "postIdx" }),
    __metadata("design:type", Number)
], Review.prototype, "postIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "restaurantIdx" }),
    __metadata("design:type", Number)
], Review.prototype, "restaurantIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "content", nullable: true, length: 300 }),
    __metadata("design:type", String)
], Review.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Review.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Review.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("double", { name: "score", nullable: true }),
    __metadata("design:type", Number)
], Review.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReviewImage_1.ReviewImage, (reviewImage) => reviewImage.reviewIdx2),
    __metadata("design:type", Array)
], Review.prototype, "Images", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ReviewComment_1.ReviewComment, (reviewComment) => reviewComment.reviewIdx2),
    __metadata("design:type", ReviewComment_1.ReviewComment)
], Review.prototype, "comment", void 0);
Review = __decorate([
    (0, typeorm_1.Entity)("Review", { schema: "immersion_DB" })
], Review);
exports.Review = Review;
//# sourceMappingURL=Review.js.map