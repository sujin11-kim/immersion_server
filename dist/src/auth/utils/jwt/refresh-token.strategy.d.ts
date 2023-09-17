import { Strategy } from "passport-jwt";
import { CustomUserQueryRepository } from 'src/users/repository/user-query.repository';
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
declare const RTStrategy_base: new (...args: any[]) => Strategy;
export declare class RTStrategy extends RTStrategy_base {
    private readonly customUserQueryRepository;
    private readonly errorResponse;
    constructor(customUserQueryRepository: CustomUserQueryRepository, errorResponse: ErrorResponse);
    validate(req: Request, payload: JwtPayload): Promise<{
        refreshToken: string;
        iss?: string;
        sub?: string;
        aud?: string | string[];
        exp?: number;
        nbf?: number;
        iat?: number;
        jti?: string;
    }>;
}
export {};
