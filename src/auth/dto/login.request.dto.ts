import { PickType } from "@nestjs/swagger";
import { User } from "mymodel/entities/User";

export class LoginRequestDto extends PickType(User, [
  "email",
  "password",
] as const) {}
