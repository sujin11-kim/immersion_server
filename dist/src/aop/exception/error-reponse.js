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
exports.ErrorResponse = void 0;
const common_1 = require("@nestjs/common");
let ErrorResponse = class ErrorResponse {
    constructor() { }
    notAuthorization() {
        throw new common_1.HttpException({ token: "not authorization" }, 401);
    }
    notAuthorizationLogin() {
        throw new common_1.HttpException({ token: "userIdx가 유효하지 않습니다." }, 402);
    }
    notExistUser() {
        throw new common_1.BadRequestException({
            statusCode: 2000,
            message: "존재하지 않는 유저입니다.",
            result: { userIdx: "" },
        });
    }
    ;
    duplicateByEmail() {
        throw new common_1.BadRequestException({
            statusCode: 2001,
            message: "이미 존재하는 이메일입니다.",
            result: { userIdx: "" },
        });
    }
    ;
    duplicateByNickname() {
        throw new common_1.BadRequestException({
            statusCode: 2002,
            message: "이미 존재하는 닉네임입니다.",
            result: { userIdx: "" },
        });
    }
    ;
    duplicateByPhone() {
        throw new common_1.BadRequestException({
            statusCode: 2003,
            message: "이미 존재하는 핸드폰 번호입니다.",
            result: { userIdx: "" },
        });
    }
    ;
    notExistFCM() {
        throw new common_1.BadRequestException({
            statusCode: 2004,
            message: "fcmToken이 존재하지 않습니다.",
            result: { fcmTokens: {} },
        });
    }
    ;
    notExistPassword() {
        throw new common_1.BadRequestException({
            statusCode: 2005,
            message: "비밀번호가 존재하지 않습니다.",
            result: { password: "" },
        });
    }
    ;
    comparePassword(existPassword) {
        throw new common_1.BadRequestException({
            statusCode: 2006,
            message: "비밀번호가 일치하지 않습니다.",
            result: { existPassword: existPassword },
        });
    }
    ;
};
ErrorResponse = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ErrorResponse);
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=error-reponse.js.map