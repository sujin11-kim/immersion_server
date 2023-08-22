import { User } from "resource/db/entities/User";
declare const UserLoginDto_base: import("@nestjs/common").Type<Pick<User, "userIdx" | "password" | "email" | "nickName">>;
export declare class UserLoginDto extends UserLoginDto_base {
    "loginType": string;
    "token": string;
}
export {};
