import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { AuthService } from "src/auth/auth.service";
import { LoginRequestDto } from "src/auth/dto/login.request.dto";
export declare class UsersController {
    private usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    create(dto: CreateUserDto): Promise<void>;
    login(data: LoginRequestDto): Promise<{
        token: string;
    }>;
    getCurrentUser(req: any): any;
}
