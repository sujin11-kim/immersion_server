import { User } from "../../../resource/db/entities/User";
import { Repository } from "typeorm";
import { ErrorResponse } from "src/aop/exception/error-reponse";
export declare class CustomUserQueryRepository {
    private readonly userRepository;
    private errorResponse;
    constructor(userRepository: Repository<User>, errorResponse: ErrorResponse);
    checkByUserIdx(userIdx: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    findAllFcm(): Promise<{
        fcmTokens: {};
    }>;
    getFCMByUserIdx(userIdx: number): Promise<string>;
}
