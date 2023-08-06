import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto {
  userIdx: number;

  email: string;

  nickName: string;
}
