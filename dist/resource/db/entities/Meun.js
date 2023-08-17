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
exports.Meun = void 0;
const typeorm_1 = require("typeorm");
const Restaurant_1 = require("./Restaurant");
let Meun = class Meun {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "meunIdx" }),
    __metadata("design:type", Number)
], Meun.prototype, "meunIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "restaurantIdx" }),
    __metadata("design:type", Number)
], Meun.prototype, "restaurantIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "contentName", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Meun.prototype, "contentName", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "price", nullable: true }),
    __metadata("design:type", Number)
], Meun.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "meunContent", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Meun.prototype, "meunContent", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "MeunViewNum", nullable: true }),
    __metadata("design:type", Number)
], Meun.prototype, "MeunViewNum", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Meun.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Meun.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "MeunImage", nullable: true }),
    __metadata("design:type", String)
], Meun.prototype, "MeunImage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Restaurant_1.Restaurant, (restaurant) => restaurant.meuns, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([
        { name: "restaurantIdx", referencedColumnName: "restaurantIdx" },
    ]),
    __metadata("design:type", Restaurant_1.Restaurant)
], Meun.prototype, "restaurantIdx2", void 0);
Meun = __decorate([
    (0, typeorm_1.Index)("Meun_meunIdx_uindex", ["meunIdx"], { unique: true }),
    (0, typeorm_1.Index)("FK_Restaurant_TO_Meun_1", ["restaurantIdx"], {}),
    (0, typeorm_1.Entity)("Meun", { schema: "immersion_DB" })
], Meun);
exports.Meun = Meun;
//# sourceMappingURL=Meun.js.map