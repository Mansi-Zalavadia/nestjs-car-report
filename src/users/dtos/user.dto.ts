import { ApiProperty } from '@nestjs/swagger/dist';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    description: 'id of user',
    example: '1',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'email of user',
    example: 'user@gmail.com',
  })
  @Expose()
  email: string;
}
