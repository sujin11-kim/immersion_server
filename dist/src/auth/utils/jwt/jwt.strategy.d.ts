import { Strategy } from "passport-jwt";
import { CustomUserQueryRepository } from 'src/users/repository/user-query.repository';
import { Payload } from "./jwt.payloads";
import { ErrorResponse } from "src/aop/exception/error-reponse";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly customUserQueryRepository;
    private readonly errorResponse;
    constructor(customUserQueryRepository: CustomUserQueryRepository, errorResponse: ErrorResponse);
    validate(payload: Payload): Promise<import("../../../../resource/db/entities/User").User>;
}
export {};