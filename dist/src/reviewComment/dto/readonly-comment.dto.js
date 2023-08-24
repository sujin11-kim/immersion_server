"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readonlyCommentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const Comment_1 = require("../../../resource/db/entities/Comment");
class readonlyCommentDto extends (0, swagger_1.PickType)(Comment_1.Comment, [
    "postIdx",
    "parentCommentIdx",
    "depth",
    "commentContent",
]) {
}
exports.readonlyCommentDto = readonlyCommentDto;
//# sourceMappingURL=readonly-comment.dto.js.map