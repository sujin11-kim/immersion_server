import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    create(data: CreateUserDto): Promise<string>;
    login(session: any, req: any, response: any): Promise<any>;
}
