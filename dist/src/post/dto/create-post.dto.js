"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const Post_1 = require("../../../resource/db/entities/Post");
class CreatePostDto extends (0, swagger_1.PickType)(Post_1.Post, [
    "title",
    "content",
    "category",
]) {
}
exports.CreatePostDto = CreatePostDto;
//# sourceMappingURL=create-post.dto.js.map