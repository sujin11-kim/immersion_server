import { User } from "mymodel/entities/user.entity";
declare const LoginRequestDto_base: import("@nestjs/common").Type<Pick<User, "id" | "password">>;
export declare class LoginRequestDto extends LoginRequestDto_base {
}
export {};
