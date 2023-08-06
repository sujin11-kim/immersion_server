export declare class ErrorResponse {
    constructor();
    notAuthorization(): void;
    notAuthorizationLogin(): void;
    notExistUser(): void;
    duplicateByEmail(): void;
    duplicateByNickname(): void;
    duplicateByPhone(): void;
    notExistFCM(): void;
    notExistPassword(): void;
    comparePassword(existPassword: any): void;
}
