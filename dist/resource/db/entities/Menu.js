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
exports.Menu = void 0;
const typeorm_1 = require("typeorm");
const Restaurant_1 = require("./Restaurant");
const moment = require("moment");
let Menu = class Menu {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "menuIdx" }),
    __metadata("design:type", Number)
], Menu.prototype, "menuIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "restaurantIdx" }),
    __metadata("design:type", Number)
], Menu.prototype, "restaurantIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "menuName", length: 100 }),
    __metadata("design:type", String)
], Menu.prototype, "menuName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "menuContent", nullable: true, length: 1000 }),
    __metadata("design:type", String)
], Menu.prototype, "menuContent", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "price" }),
    __metadata("design:type", Number)
], Menu.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "viewNum", nullable: true }),
    __metadata("design:type", Number)
], Menu.prototype, "viewNum", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "MenuImage", nullable: true }),
    __metadata("design:type", String)
], Menu.prototype, "menuImage", void 0);
__decorate([
    (0, typeorm_1.Column)({
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
], Menu.prototype, "saleClosingTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Restaurant_1.Restaurant, (restaurant) => restaurant.menus, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([
        { name: "restaurantIdx", referencedColumnName: "restaurantIdx" },
    ]),
    __metadata("design:type", Restaurant_1.Restaurant)
], Menu.prototype, "restaurantIdx2", void 0);
Menu = __decorate([
    (0, typeorm_1.Index)("Menu_menuIdx_uindex", ["menuIdx"], { unique: true }),
    (0, typeorm_1.Index)("FK_Restaurant_TO_Menu_1", ["restaurantIdx"], {}),
    (0, typeorm_1.Entity)("Menu", { schema: "immersion_DB" })
], Menu);
exports.Menu = Menu;
//# sourceMappingURL=Menu.js.map