import {
  IsString,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
  IsNumberString,
} from "class-validator";
export class CreateUserDto {
  @IsNumberString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  readonly id: number;

  @IsNotEmpty()
  readonly nickname: string;

  @IsNotEmpty()
  readonly phone: string;

  readonly enrolldate: Date;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
