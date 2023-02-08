import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialDto {
  @IsEmail()
  @ApiProperty({
    description: 'email of user',
    example: 'user@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'password of user',
    example: 'gdhagsh',
  })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  //  •	Passwords will contain at least 1 upper case letter
  // •	Passwords will contain at least 1 lower case letter
  // •	Passwords will contain at least 1 number or special character
  // •	There is no length validation (min, max) in this regex!
  password: string;
}
