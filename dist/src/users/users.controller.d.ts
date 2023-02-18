import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(data: CreateUserDto): Promise<string>;
}
