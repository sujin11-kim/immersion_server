import { PickType } from "@nestjs/swagger";
import { User } from "resource/db/entities/User";

export class UserLoginDto extends PickType(User, [
  "userIdx",
  "email",
  "nickName",
  "password",
] as const) {
  "loginType": string
  "token": string
}