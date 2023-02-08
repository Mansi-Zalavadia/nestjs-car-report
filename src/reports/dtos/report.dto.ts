import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class ReportDto {
  @ApiProperty({ description: 'id of report', example: '1' })
  @Expose()
  id: number;

  @ApiProperty({ description: 'price of car', example: '50000' })
  @Expose()
  price: number;

  @ApiProperty({ description: 'year of car', example: '1980' })
  @Expose()
  year: number;

  @ApiProperty({ description: 'longitude of car', example: '0' })
  @Expose()
  lng: number;

  @ApiProperty({ description: 'latitude of car', example: '0' })
  @Expose()
  lat: number;

  @ApiProperty({ description: 'name of car', example: 'ford' })
  @Expose()
  make: string;

  @ApiProperty({ description: 'model of car', example: 'mustang' })
  @Expose()
  model: string;

  @ApiProperty({ description: 'milage of car ', example: '50000' })
  @Expose()
  milage: number;

  @ApiProperty({ description: 'approved', example: 'true' })
  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  @ApiProperty({ description: 'userid', example: '1' })
  userId: number;
}
