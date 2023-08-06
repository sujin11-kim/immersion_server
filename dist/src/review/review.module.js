"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const review_controller_1 = require("./review.controller");
const review_service_1 = require("./review.service");
const typeorm_1 = require("@nestjs/typeorm");
const Review_1 = require("../../resource/db/entities/Review");
const auth_module_1 = require("../auth/auth.module");
const User_1 = require("../../resource/db/entities/User");
const Post_1 = require("../../resource/db/entities/Post");
const review_command_repository_1 = require("./repository/review-command.repository");
const review_query_repository_1 = require("./repository/review-query.repository");
const review_implements_1 = require("./interface/review.implements");
let ReviewModule = class ReviewModule {
};
ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Review_1.Review, User_1.User, Post_1.Post]), auth_module_1.AuthModule],
        controllers: [review_controller_1.ReviewController],
        providers: [
            review_service_1.ReviewService,
            review_implements_1.ReviewtIml,
            review_command_repository_1.CustomReviewCommandRepository,
            review_query_repository_1.CustomReviewQueryRepository,
        ],
    })
], ReviewModule);
exports.ReviewModule = ReviewModule;
//# sourceMappingURL=review.module.js.map