import { Strategy } from "passport-local";
import { CustomUserQueryRepository } from 'src/users/repository/user-query.repository';
import { ErrorResponse } from "src/aop/exception/error-reponse";
declare const ATStrategy_base: new (...args: any[]) => Strategy;
export declare class ATStrategy extends ATStrategy_base {
    private readonly customUserQueryRepository;
    private readonly errorResponse;
    constructor(customUserQueryRepository: CustomUserQueryRepository, errorResponse: ErrorResponse);
    validate(payload: any): Promise<import("../../../../resource/db/entities/User").User>;
}
export {};
