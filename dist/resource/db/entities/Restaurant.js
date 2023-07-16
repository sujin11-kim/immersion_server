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
exports.Restaurant = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Restaurant = class Restaurant {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "restaurantIdx" }),
    __metadata("design:type", Number)
], Restaurant.prototype, "restaurantIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "userIdx" }),
    __metadata("design:type", Number)
], Restaurant.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "restaurantName", nullable: true, length: 20 }),
    __metadata("design:type", String)
], Restaurant.prototype, "restaurantName", void 0);
__decorate([
    (0, typeorm_1.Column)("time", { name: "openTime", nullable: true }),
    __metadata("design:type", String)
], Restaurant.prototype, "openTime", void 0);
__decorate([
    (0, typeorm_1.Column)("time", { name: "closeTime", nullable: true }),
    __metadata("design:type", String)
], Restaurant.prototype, "closeTime", void 0);
__decorate([
    (0, typeorm_1.Column)("char", { name: "telNum", nullable: true, length: 11 }),
    __metadata("design:type", String)
], Restaurant.prototype, "telNum", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "isAuthorized", nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], Restaurant.prototype, "isAuthorized", void 0);
__decorate([
    (0, typeorm_1.Column)("double", {
        name: "latitude",
        nullable: true,
        precision: 22,
        default: () => "'0'",
    }),
    __metadata("design:type", Number)
], Restaurant.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)("double", {
        name: "longitude",
        nullable: true,
        precision: 22,
        default: () => "'0'",
    }),
    __metadata("design:type", Number)
], Restaurant.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "isPostedToday", nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], Restaurant.prototype, "isPostedToday", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.restaurants, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "userIdx", referencedColumnName: "userIdx" }]),
    __metadata("design:type", User_1.User)
], Restaurant.prototype, "userIdx2", void 0);
Restaurant = __decorate([
    (0, typeorm_1.Index)("FK_User_TO_Restaurant_1", ["userIdx"], {}),
    (0, typeorm_1.Entity)("Restaurant", { schema: "immersion_DB" })
], Restaurant);
exports.Restaurant = Restaurant;
//# sourceMappingURL=Restaurant.js.map