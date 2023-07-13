import { CreateUserDto } from "../dto/create-user.dto";

export interface UserInterface {
  createUser(userInfo: CreateUserDto): Promise<{ userIdx: number }>;
}
