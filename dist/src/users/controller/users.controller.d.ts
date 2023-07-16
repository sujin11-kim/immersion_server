import { CreateUserDto } from "../dto/create-user.dto";
import { UsersService } from "../service/users.service";
import { AuthService } from "src/auth/auth.service";
import { LoginRequestDto } from "src/auth/dto/login.request.dto";
export declare class UsersController {
    private usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    create(dto: CreateUserDto): Promise<{
        userIdx: number;
    }>;
    login(data: LoginRequestDto): Promise<{
        token: string;
    }>;
    findAllFCM(): Promise<Record<"fcmTokens", object>>;
    findFCM(userIdx: number): Promise<Record<"fcmToken", string>>;
    kakaoLogin(customHeader: string): Promise<any>;
    getCurrentUser(user: any): any;
}
