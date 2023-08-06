import { CustomUserCommandRepository } from "../../users/repository/user-command.repository";
import { CustomUserQueryRepository } from "../../users/repository/user-query.repository";
import { ErrorResponse } from "src/aop/exception/error-reponse";
export declare class KakaoLoginStrategy {
    private readonly customUserCommandRepository;
    private readonly customUserQueryRepository;
    private readonly errorResponse;
    private readonly jwtService;
    private readonly axiosInstance;
    private kakaoUser;
    constructor(customUserCommandRepository: CustomUserCommandRepository, customUserQueryRepository: CustomUserQueryRepository, errorResponse: ErrorResponse);
    kakaoToLocalToken(token: string): Promise<any>;
}
