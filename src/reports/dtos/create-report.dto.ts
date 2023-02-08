import {
  IsString,
  IsNumber,
  Max,
  Min,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class createReportDto {
  @ApiProperty({ description: 'name of car', example: 'Ford' })
  @IsString()
  make: string;

  @ApiProperty({ description: 'model of car', example: 'mustang' })
  @IsString()
  model: string;

  @ApiProperty({ description: 'year of car', example: '1998' })
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @ApiProperty({ description: 'longitude of car', example: '0' })
  @IsLongitude()
  lng: number;

  @ApiProperty({ description: 'latitude of car', example: '0' })
  @IsLatitude()
  lat: number;

  @ApiProperty({ description: 'milage of car', example: '50000' })
  @IsNumber()
  @Min(0)
  @Max(100000)
  milage: number;

  @ApiProperty({ description: 'price of car', example: '50000' })
  @IsNumber()
  @Min(0)
  @Max(100000)
  price: number;
}
