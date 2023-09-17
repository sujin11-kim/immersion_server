import { User } from "resource/db/entities/User";
declare const UserLoginDto_base: import("@nestjs/common").Type<Pick<User, "userIdx" | "email" | "nickName" | "password">>;
export declare class UserLoginDto extends UserLoginDto_base {
    "loginType": string;
    "token": string;
}
export {};
