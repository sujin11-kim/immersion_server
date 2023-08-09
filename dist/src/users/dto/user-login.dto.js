"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const User_1 = require("../../../resource/db/entities/User");
class UserLoginDto extends (0, swagger_1.PickType)(User_1.User, [
    "userIdx",
    "email",
    "nickName",
    "password",
]) {
}
exports.UserLoginDto = UserLoginDto;
//# sourceMappingURL=user-login.dto.js.map