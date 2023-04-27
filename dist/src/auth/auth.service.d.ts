import { JwtService } from "@nestjs/jwt";
import { User } from "mymodel/entities/User";
import { Repository } from "typeorm";
import { LoginRequestDto } from "./dto/login.request.dto";
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    jwtLogIn(data: LoginRequestDto): Promise<{
        token: string;
    }>;
}
