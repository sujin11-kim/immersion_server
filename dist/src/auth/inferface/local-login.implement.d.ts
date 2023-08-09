import { JwtService } from "@nestjs/jwt";
import { CustomUserQueryRepository } from "src/users/repository/user-query.repository";
import { ErrorResponse } from "src/aop/exception/error-reponse";
export declare class LocalLoginStrategy {
    private readonly jwtService;
    private readonly customUserQueryRepository;
    private readonly errorResponse;
    private email_;
    private password_;
    private userIdx_;
    constructor(jwtService: JwtService, customUserQueryRepository: CustomUserQueryRepository, errorResponse: ErrorResponse);
    setter(email: string, password: string): void;
    getLocalToken(): Promise<{
        token: string;
    }>;
}
