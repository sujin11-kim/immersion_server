import { User } from "../../../resource/db/entities/User";
import { Repository } from "typeorm";
import { UserInterface } from "./user.interface";
import { CreateUserDto } from "../dto/create-user.dto";
import { CustomUserCommandRepository } from "../repository/user-command.repository";
import { CustomUserQueryRepository } from "../repository/user-query.repository";
import { ErrorResponse } from "src/aop/exception/error-reponse";
export declare class UserImpl implements UserInterface {
    private readonly customUserCommandRepository;
    private readonly customUserQueryRepository;
    private userEntityRepository;
    private errorResponse;
    constructor(customUserCommandRepository: CustomUserCommandRepository, customUserQueryRepository: CustomUserQueryRepository, userEntityRepository: Repository<User>, errorResponse: ErrorResponse);
    createUser(userInfo: CreateUserDto): Promise<{
        userIdx: string;
    }>;
    getAllFCM(): Promise<Record<"fcmTokens", object>>;
    getFCMByUserIdx(userIdx: number): Promise<Record<"fcmToken", string>>;
}
