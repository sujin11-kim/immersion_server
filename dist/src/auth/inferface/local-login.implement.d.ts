import { JwtService } from "@nestjs/jwt";
import { CustomUserQueryRepository } from "src/users/repository/user-query.repository";
import { CustomUserCommandRepository } from "src/users/repository/user-Command.repository";
import { ErrorResponse } from "src/aop/exception/error-reponse";
import Redis from "ioredis";
export declare class LocalLoginStrategy {
    private readonly client;
    private readonly jwtService;
    private readonly customUserCommandRepository;
    private readonly customUserQueryRepository;
    private readonly errorResponse;
    private email_;
    private password_;
    private userIdx_;
    constructor(client: Redis, jwtService: JwtService, customUserCommandRepository: CustomUserCommandRepository, customUserQueryRepository: CustomUserQueryRepository, errorResponse: ErrorResponse);
    setter(email: string, password: string): void;
    getLocalTokens(): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private getAccessToken;
    private getRefreshToken;
    private hashAndStoreRefreshToken;
}
