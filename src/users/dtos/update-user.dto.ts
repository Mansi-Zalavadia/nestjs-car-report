import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class updateUserDto {
  @ApiProperty({ description: 'enail of user', example: 'user@gmail.com' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ description: 'password of the user', example: 'dhjsdhc' })
  @IsString()
  @IsOptional()
  password: string;
}
