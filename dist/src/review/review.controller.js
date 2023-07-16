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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const create_review_dto_1 = require("./dto/create-review.dto");
const update_review_dto_1 = require("./dto/update-review.dto");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const user_decorator_1 = require("../../src/aop/decorators/user.decorator");
const user_login_dto_1 = require("../users/dto/user-login.dto");
const http_exception_filter_1 = require("../../src/aop/exception/http-exception.filter");
const success_interceptor_1 = require("../../src/aop/interceptors/success.interceptor");
const swagger_1 = require("@nestjs/swagger");
let ReviewController = class ReviewController {
    constructor(reveiwservice) {
        this.reveiwservice = reveiwservice;
    }
    getAllReview() {
        return this.reveiwservice.getAllReview();
    }
    getoneReview(reviewIdx) {
        return this.reveiwservice.getoneReview(reviewIdx);
    }
    create(createReviewDto, user) {
        return this.reveiwservice.create(user, createReviewDto);
    }
    update(reviewIdx, updateReviewDto) {
        return this.reveiwservice.update(reviewIdx, updateReviewDto);
    }
    delete(reviewIdx) {
        return this.reveiwservice.delete(reviewIdx);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "모든 리뷰 조회" }),
    (0, common_1.Get)("AllReview"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "getAllReview", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "특정 리뷰 조회" }),
    (0, common_1.Get)("Onereview/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "getoneReview", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "리뷰 작성" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("Newreview"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.CreateReviewDto,
        user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "특정리뷰 수정" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("Onereviewupdate/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "특정리뷰 삭제" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "delete", null);
ReviewController = __decorate([
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    (0, common_1.Controller)("review"),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map