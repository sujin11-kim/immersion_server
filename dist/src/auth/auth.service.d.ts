import { JwtService } from "@nestjs/jwt";
import { User } from "mymodel/entities/user.entity";
import { Repository } from "typeorm";
import { LoginRequestDto } from "./dto/login.request.dto";
export declare class AuthService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    jwtLogIn(data: LoginRequestDto): Promise<{
        token: string;
    }>;
}
