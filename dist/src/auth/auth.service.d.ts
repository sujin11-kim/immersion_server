import { JwtService } from "@nestjs/jwt";
import { User } from "resource/db/entities/User";
import { Repository } from "typeorm";
import { LoginRequestDto } from "./dto/login.request.dto";
export declare class AuthService {
    private userRepository;
    private jwtService;
    private readonly axiosInstance;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    jwtLogIn(data: LoginRequestDto): Promise<{
        token: string;
    }>;
    kakaoTokenToLocalToken(token: string): Promise<any>;
}
