"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewCommentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const review_comment_controller_1 = require("./controller/review.comment.controller");
const review_comment_service_1 = require("./service/review.comment.service");
const review_comment_command_repository_1 = require("./repository/review-comment-command.repository");
const review_comment_query_repository_1 = require("./repository/review-comment-query.repository");
const review_comment_implement_1 = require("./interface/review.comment.implement");
const error_reponse_1 = require("../aop/exception/error-reponse");
const ReviewComment_1 = require("../../resource/db/entities/ReviewComment");
const Review_1 = require("../../resource/db/entities/Review");
const Restaurant_1 = require("../../resource/db/entities/Restaurant");
let ReviewCommentModule = class ReviewCommentModule {
};
ReviewCommentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ReviewComment_1.ReviewComment, Review_1.Review, Restaurant_1.Restaurant])],
        controllers: [review_comment_controller_1.ReviewCommentController],
        providers: [
            review_comment_service_1.ReviewCommentService,
            review_comment_command_repository_1.CustomReviewCommentCommandRepository,
            review_comment_query_repository_1.CustomReviewCommentQueryRepository,
            review_comment_implement_1.ReviewCommentImpl,
            error_reponse_1.ErrorResponse,
        ],
    })
], ReviewCommentModule);
exports.ReviewCommentModule = ReviewCommentModule;
//# sourceMappingURL=review.comment.module.js.map