import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty, Matches } from "class-validator";

export class SocialUserDto {
  @ApiProperty({
    example: 'example@immersion.com',
    description: 'this is email of social login',
  })
  email: string;

  @ApiProperty({
    example: 'Geon',
    description: 'this is nickname of social login',
  })
  nickName: string;

  @ApiProperty({
    example: '1',
    description: 'this is userIdx of signup',
  })
  userIdx: number;
}
