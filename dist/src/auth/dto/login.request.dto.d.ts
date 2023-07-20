import { User } from "resource/db/entities/User";
declare const LoginRequestDto_base: import("@nestjs/common").Type<Pick<User, "password" | "email">>;
export declare class LoginRequestDto extends LoginRequestDto_base {
}
export {};
