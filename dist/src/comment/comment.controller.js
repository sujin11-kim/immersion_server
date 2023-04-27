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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const suucess_interceptor_1 = require("../common/intercepors/suucess.interceptor");
const http_exception_filter_1 = require("../common/exception/http-exception.filter");
const user_decorator_1 = require("../common/decorators/user.decorator");
const user_login_dto_1 = require("../users/dto/user-login.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    findAllComment(postIdx) {
        console.log(postIdx);
        return this.commentService.findAllComment(postIdx);
    }
    createComment(createCommentDto, user) {
        const { postIdx, parentCommentIdx, depth, commentContent } = createCommentDto;
        return this.commentService.createComment(postIdx, user.id, parentCommentIdx, depth, commentContent);
    }
    modifyComment(createCommentDto) {
        const { postIdx, commentContent } = createCommentDto;
        return this.commentService.modifyComment(postIdx, commentContent);
    }
    removeComment(commentIdx) {
        return this.commentService.removeComment(commentIdx);
    }
};
__decorate([
    (0, common_1.Get)(":postIdx"),
    __param(0, (0, common_1.Param)("postIdx")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "findAllComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto,
        user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "createComment", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "modifyComment", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "removeComment", null);
CommentController = __decorate([
    (0, common_1.UseInterceptors)(suucess_interceptor_1.SuccessInterceptor),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    (0, swagger_1.ApiTags)("COMMENT"),
    (0, common_1.Controller)("comment"),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map