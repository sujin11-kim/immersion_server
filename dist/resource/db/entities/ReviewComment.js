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
exports.ReviewComment = void 0;
const typeorm_1 = require("typeorm");
const moment = require("moment");
const Review_1 = require("./Review");
let ReviewComment = class ReviewComment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "commentIdx" }),
    __metadata("design:type", Number)
], ReviewComment.prototype, "commentIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "reviewIdx" }),
    __metadata("design:type", Number)
], ReviewComment.prototype, "reviewIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "content", nullable: true, length: 1000 }),
    __metadata("design:type", String)
], ReviewComment.prototype, "content", void 0);
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
], ReviewComment.prototype, "createdAt", void 0);
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
], ReviewComment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Review_1.Review, (review) => review.comment),
    (0, typeorm_1.JoinColumn)({ name: "reviewIdx", referencedColumnName: "reviewIdx" }),
    __metadata("design:type", Review_1.Review)
], ReviewComment.prototype, "reviewIdx2", void 0);
ReviewComment = __decorate([
    (0, typeorm_1.Index)("ReviewComment_commentIdx_uindex", ["commentIdx"], { unique: true }),
    (0, typeorm_1.Index)("FK_Review_TO_ReviewComment_1", ["reviewIdx"], {}),
    (0, typeorm_1.Entity)("ReviewComment", { schema: "immersion_DB" })
], ReviewComment);
exports.ReviewComment = ReviewComment;
//# sourceMappingURL=ReviewComment.js.map