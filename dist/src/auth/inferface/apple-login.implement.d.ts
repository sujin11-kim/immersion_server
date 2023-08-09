import { ErrorResponse } from "src/aop/exception/error-reponse";
import { CustomUserCommandRepository } from 'src/users/repository/user-command.repository';
import { CustomUserQueryRepository } from 'src/users/repository/user-query.repository';
export type AppleJwtTokenPayload = {
    iss: string;
    aud: string;
    exp: number;
    iat: number;
    sub: string;
    nonce: string;
    c_hash: string;
    email?: string;
    email_verified?: string;
    is_private_email?: string;
    auth_time: number;
    nonce_supported: boolean;
};
export declare class AppleLoginStrategy {
    private readonly customUserCommandRepository;
    private readonly customUserQueryRepository;
    private readonly errorResponse;
    private readonly jwtService;
    private appleUser;
    constructor(customUserCommandRepository: CustomUserCommandRepository, customUserQueryRepository: CustomUserQueryRepository, errorResponse: ErrorResponse);
    appleToLocalToken(appleIdToken: string): Promise<any>;
}
