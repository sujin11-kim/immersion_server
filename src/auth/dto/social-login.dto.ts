import { IsString, IsEmail, IsNotEmpty, Matches } from "class-validator";

export class SocialUserDto {
  email: string;

  nickName: string;

  userIdx: number;
}
