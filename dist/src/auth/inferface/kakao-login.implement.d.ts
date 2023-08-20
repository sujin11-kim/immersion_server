import { CustomUserCommandRepository } from "../../users/repository/user-command.repository";
import { CustomUserQueryRepository } from "../../users/repository/user-query.repository";
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { User } from "resource/db/entities/User";
import { Repository } from "typeorm";
export declare class KakaoLoginStrategy {
    private readonly customUserCommandRepository;
    private readonly customUserQueryRepository;
    private readonly errorResponse;
    private readonly userRepository;
    private readonly jwtService;
    private readonly axiosInstance;
    private kakaoUser;
    constructor(customUserCommandRepository: CustomUserCommandRepository, customUserQueryRepository: CustomUserQueryRepository, errorResponse: ErrorResponse, userRepository: Repository<User>);
    kakaoToLocalToken(token: string): Promise<any>;
}
