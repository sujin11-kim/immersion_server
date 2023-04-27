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
exports.ChatRoom = void 0;
const typeorm_1 = require("typeorm");
const Message_1 = require("./Message");
let ChatRoom = class ChatRoom {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "roomIdx" }),
    __metadata("design:type", Number)
], ChatRoom.prototype, "roomIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "roomName", nullable: true, length: 50 }),
    __metadata("design:type", String)
], ChatRoom.prototype, "roomName", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "isSentPush", nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], ChatRoom.prototype, "isSentPush", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "isLoginUser", nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], ChatRoom.prototype, "isLoginUser", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "newMessageCount", nullable: true }),
    __metadata("design:type", Number)
], ChatRoom.prototype, "newMessageCount", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { name: "createdAt", nullable: true }),
    __metadata("design:type", Date)
], ChatRoom.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { name: "updatedAt", nullable: true }),
    __metadata("design:type", Date)
], ChatRoom.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, (message) => message.roomIdx2),
    __metadata("design:type", Array)
], ChatRoom.prototype, "messages", void 0);
ChatRoom = __decorate([
    (0, typeorm_1.Index)("ChatRoom_roomIdx_uindex", ["roomIdx"], { unique: true }),
    (0, typeorm_1.Entity)("ChatRoom", { schema: "immersion_DB" })
], ChatRoom);
exports.ChatRoom = ChatRoom;
//# sourceMappingURL=ChatRoom.js.map