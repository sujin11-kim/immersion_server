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
exports.RestaurantImage = void 0;
const typeorm_1 = require("typeorm");
const Restaurant_1 = require("./Restaurant");
let RestaurantImage = class RestaurantImage {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "imageIdx" }),
    __metadata("design:type", Number)
], RestaurantImage.prototype, "imageIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "restaurantIdx" }),
    __metadata("design:type", Number)
], RestaurantImage.prototype, "restaurantIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "imagePath", length: 1000 }),
    __metadata("design:type", String)
], RestaurantImage.prototype, "imagePath", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Restaurant_1.Restaurant, (restaurant) => restaurant.restaurantIdx, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([
        { name: "restaurantIdx", referencedColumnName: "restaurantIdx" },
    ]),
    __metadata("design:type", Restaurant_1.Restaurant)
], RestaurantImage.prototype, "restaurantIdx2", void 0);
RestaurantImage = __decorate([
    (0, typeorm_1.Entity)("RestaurantImage", { schema: "immersion_DB" })
], RestaurantImage);
exports.RestaurantImage = RestaurantImage;
//# sourceMappingURL=RestaurantImage.js.map