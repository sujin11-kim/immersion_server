export declare class ErrorResponse {
    constructor();
    notAuthorization(): void;
    notAuthorizationLogin(): void;
    notAuthorizationKakao(): void;
    notAuthorizationApple(): void;
    notExistUser(): void;
    duplicateByEmail(): void;
    duplicateByNickname(): void;
    duplicateByPhone(): void;
    notExistFCM(): void;
    notExistPassword(): void;
    comparePassword(existPassword: any): void;
    notExistReview(existReviewId: any): void;
    notExistPost(existPostId: any): void;
    notExistCommnet(existCommentId: any): void;
}
