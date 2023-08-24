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
    notAuthorizationKakao() {
        throw new common_1.HttpException({ token: "not authorization kakao login" }, 403);
    }
    notAuthorizationApple() {
        throw new common_1.HttpException({ token: "not authorization apple login" }, 404);
    }
    notExistUser() {
        throw new common_1.BadRequestException({
            statusCode: 2000,
            message: "존재하지 않는 유저입니다.",
            result: { userIdx: "" },
        });
    }
    duplicateByEmail() {
        throw new common_1.BadRequestException({
            statusCode: 2001,
            message: "이미 존재하는 이메일입니다.",
            result: { userIdx: "" },
        });
    }
    duplicateByNickname() {
        throw new common_1.BadRequestException({
            statusCode: 2002,
            message: "이미 존재하는 닉네임입니다.",
            result: { userIdx: "" },
        });
    }
    duplicateByPhone() {
        throw new common_1.BadRequestException({
            statusCode: 2003,
            message: "이미 존재하는 핸드폰 번호입니다.",
            result: { userIdx: "" },
        });
    }
    notExistFCM() {
        throw new common_1.BadRequestException({
            statusCode: 2004,
            message: "fcmToken이 존재하지 않습니다.",
            result: { fcmTokens: {} },
        });
    }
    notExistPassword() {
        throw new common_1.BadRequestException({
            statusCode: 2005,
            message: "비밀번호가 존재하지 않습니다.",
            result: { password: "" },
        });
    }
    comparePassword(existPassword) {
        throw new common_1.BadRequestException({
            statusCode: 2006,
            message: "비밀번호가 일치하지 않습니다.",
            result: { existPassword: existPassword },
        });
    }
    notExistReview(existReviewId) {
        throw new common_1.BadRequestException({
            statusCode: 2007,
            message: "존재하는 리뷰가 없습니다.",
            result: { reviewIdx: "" },
        });
    }
    notExistPost(existPostId) {
        throw new common_1.BadRequestException({
            statusCode: 2008,
            message: "존재하는 게시물이 없습니다.",
            result: { postIdx: "" },
        });
    }
    notExistCommnet(existCommentId) {
        throw new common_1.BadRequestException({
            statusCode: 2009,
            message: "존재하는 댓글이 없습니다.",
            result: { commentIdx: "" },
        });
    }
    exceedContentLength() {
        throw new common_1.BadRequestException({
            statusCode: 2010,
            message: `content가 제한 글자수 100자를 초과했습니다.`,
            result: {
                restaurantName: "",
                openTime: "",
                closeTime: "",
                telNum: "",
                restaurantIntro: "",
                image: [],
            },
        });
    }
    userPostNotFound() {
        throw new common_1.BadRequestException({
            statusCode: 2011,
            message: "해당 유저의 게시물이 존재하지 않습니다.",
            result: [
                {
                    userIdx: null,
                    category: "",
                    title: "",
                    content: "",
                    likeNum: null,
                    viewNum: null,
                    postIdx: null,
                    createAt: "",
                    updatedAt: "",
                    nickName: "",
                    imagePath: [],
                    commentList: [],
                },
            ],
        });
    }
    categoryPostsNotFound() {
        throw new common_1.BadRequestException({
            statusCode: 2012,
            message: "해당 카테고리의 게시물이 존재하지 않습니다.",
            result: [
                {
                    userIdx: null,
                    category: "",
                    title: "",
                    content: "",
                    likeNum: null,
                    viewNum: null,
                    postIdx: null,
                    createAt: "",
                    updatedAt: "",
                    nickName: "",
                    imagePath: [],
                    commentList: [],
                },
            ],
        });
    }
    maxPostsExceeded() {
        throw new common_1.BadRequestException({
            statusCode: 2013,
            message: "전체 게시물 수를 초과하여 조회할 수 없습니다.",
            result: [
                {
                    userIdx: null,
                    category: "",
                    title: "",
                    content: "",
                    likeNum: null,
                    viewNum: null,
                    postIdx: null,
                    createAt: "",
                    updatedAt: "",
                    nickName: "",
                    imagePath: [],
                    commentList: [],
                },
            ],
        });
    }
    postNotFound() {
        throw new common_1.BadRequestException({
            statusCode: 2014,
            message: "postIdx에 해당하는 게시물이 없습니다.",
            result: {
                userIdx: null,
                category: "",
                title: "",
                content: "",
                likeNum: null,
                viewNum: null,
                postIdx: null,
                createAt: "",
                updatedAt: "",
                nickName: "",
                imagePath: [],
                commentList: [],
            },
        });
    }
    likeNotFound() {
        throw new common_1.BadRequestException({
            statusCode: 2015,
            message: "해당 게시물에 좋아요를 누르지 않은 유저입니다.",
            result: {
                userIdx: null,
                category: "",
                title: "",
                content: "",
                likeNum: null,
                viewNum: null,
                postIdx: null,
                createAt: "",
                updatedAt: "",
                nickName: "",
                imagePath: [],
                commentList: [],
            },
        });
    }
    notFoundPost() {
        throw new common_1.BadRequestException({
            statusCode: 2016,
            message: "존재하지 않는 게시물입니다.",
            result: {
                commentIdx: null,
                postIdx: null,
                userIdx: null,
                parentCommentIdx: null,
                depth: null,
                commentAt: "",
                commentContent: "",
                isDeleted: null,
            },
        });
    }
    notFoundComment() {
        throw new common_1.BadRequestException({
            statusCode: 2017,
            message: "해당 게시물의 댓글이 존재하지 않습니다.",
            result: [
                {
                    commentIdx: null,
                    postIdx: null,
                    userIdx: null,
                    parentCommentIdx: null,
                    depth: null,
                    commentAt: "",
                    commentContent: "",
                    isDeleted: null,
                },
            ],
        });
    }
    notFoundSearch() {
        throw new common_1.BadRequestException({
            statusCode: 2018,
            message: "검색 결과가 존재하지 않습니다.",
            result: { menuList: [] },
        });
    }
    notFoundReview() {
        throw new common_1.BadRequestException({
            statusCode: 2019,
            message: "리뷰가 존재하지 않습니다.",
            result: {
                reviewIdx: null,
                content: "",
                commentIdx: null,
                createdAt: "",
                updatedAt: "",
            },
        });
    }
    notRestaurantOwner() {
        throw new common_1.BadRequestException({
            statusCode: 2020,
            message: "사장님으로 등록된 유저가 아닙니다.",
            result: {
                reviewIdx: null,
                content: "",
                commentIdx: null,
                createdAt: "",
                updatedAt: "",
            },
        });
    }
    onlyOwnerCanAccess(result) {
        throw new common_1.BadRequestException({
            statusCode: 2021,
            message: "해당 가게 사장님만 리뷰 댓글에 접근할 수 있습니다.",
            result,
        });
    }
    alreadyExistingCommentError() {
        throw new common_1.BadRequestException({
            statusCode: 2022,
            message: "해당 리뷰에 이미 사장님 댓글이 존재합니다.",
            result: {
                reviewIdx: null,
                content: "",
                commentIdx: null,
                createdAt: "",
                updatedAt: "",
            },
        });
    }
    notFoundReviewComment(result) {
        throw new common_1.BadRequestException({
            statusCode: 2023,
            message: "해당 댓글이 존재하지 않습니다.",
            result,
        });
    }
};
ErrorResponse = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ErrorResponse);
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=error-reponse.js.map