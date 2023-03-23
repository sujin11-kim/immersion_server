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
let User = class User {
};
__decorate([
    (0, typeorm_1.Column)("varchar", { primary: true, name: "id", length: 10 }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "nickname", nullable: true, length: 20 }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)("char", { name: "phone", nullable: true, length: 11 }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "enrolldate", nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "enrolldate", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "password", nullable: true, length: 300 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("User", { schema: "immersion_DB" })
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map