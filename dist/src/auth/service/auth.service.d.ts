import { LoginImpl } from "../inferface/login-case.implement";
import { UserLoginDto } from "src/users/dto/user-login.dto";
export declare class AuthService {
    private loginImpl;
    constructor(loginImpl: LoginImpl);
    login(data: UserLoginDto): Promise<any>;
}
