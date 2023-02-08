import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'email of user',
    example: 'user@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password of user',
    example: 'gdhagsh',
  })
  @IsString()
  password: string;
}
