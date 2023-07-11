import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { AuthService } from "src/auth/auth.service";
import { LoginRequestDto } from "src/auth/dto/login.request.dto";
import { UserLoginDto } from "./dto/user-login.dto";
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
    saveFCMToken(user: UserLoginDto, fcmToken: string): Promise<{
        message: string;
    }>;
    findFCM(): Promise<{
        fcmTokens: {};
    }>;
    kakaoLogin(customHeader: string): Promise<any>;
    getCurrentUser(user: any): any;
}
