import { PickType } from "@nestjs/swagger";
import { User } from "mymodel/entities/user.entity";

export class LoginRequestDto extends PickType(User, [
  "id",
  "password",
] as const) {}
