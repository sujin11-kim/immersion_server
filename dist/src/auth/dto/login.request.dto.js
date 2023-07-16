"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const User_1 = require("../../../resource/db/entities/User");
class LoginRequestDto extends (0, swagger_1.PickType)(User_1.User, [
    "email",
    "password",
]) {
}
exports.LoginRequestDto = LoginRequestDto;
//# sourceMappingURL=login.request.dto.js.map