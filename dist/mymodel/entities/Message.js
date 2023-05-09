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
exports.Message = void 0;
const typeorm_1 = require("typeorm");
const ChatRoom_1 = require("./ChatRoom");
const ChatUser_1 = require("./ChatUser");
let Message = class Message {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "messageIdx" }),
    __metadata("design:type", Number)
], Message.prototype, "messageIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { primary: true, name: "chatUserIdx" }),
    __metadata("design:type", Number)
], Message.prototype, "chatUserIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { primary: true, name: "roomIdx" }),
    __metadata("design:type", Number)
], Message.prototype, "roomIdx", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "content", nullable: true, length: 2000 }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { name: "createdAt", nullable: true }),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ChatRoom_1.ChatRoom, (chatRoom) => chatRoom.messages, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "roomIdx", referencedColumnName: "roomIdx" }]),
    __metadata("design:type", ChatRoom_1.ChatRoom)
], Message.prototype, "roomIdx2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ChatUser_1.ChatUser, (chatUser) => chatUser.messages, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "chatUserIdx", referencedColumnName: "chatUserIdx" }]),
    __metadata("design:type", ChatUser_1.ChatUser)
], Message.prototype, "chatUserIdx2", void 0);
Message = __decorate([
    (0, typeorm_1.Index)("Message_messageIdx_uindex", ["messageIdx"], { unique: true }),
    (0, typeorm_1.Index)("FK_ChatUser_TO_Message_1", ["chatUserIdx"], {}),
    (0, typeorm_1.Index)("FK_ChatRoom_TO_Message_1", ["roomIdx"], {}),
    (0, typeorm_1.Entity)("Message", { schema: "immersion_DB" })
], Message);
exports.Message = Message;
//# sourceMappingURL=Message.js.map