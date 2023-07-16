import { PickType } from "@nestjs/swagger";
import { User } from "resource/db/entities/User";

export class LoginRequestDto extends PickType(User, [
  "email",
  "password",
] as const) {}
