export class CreateUserDto {
  readonly id: number;
  readonly nickName: string;
  readonly phone: string;
  readonly enrollDate: Date;
  readonly password: string;
}