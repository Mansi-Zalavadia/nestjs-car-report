import {
  IsString,
  IsNumber,
  Max,
  Min,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class GetEstimateDto {
  @ApiProperty({ description: 'name of car', example: 'Ford' })
  @IsString()
  make: string;

  @IsString()
  @ApiProperty({ description: 'model of car', example: 'mustang' })
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  @ApiProperty({ description: 'year of car', example: '1998' })
  year: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  @ApiProperty({ description: 'longitude of car', example: '0' })
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  @ApiProperty({ description: 'latitude of car', example: '0' })
  lat: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(100000)
  @ApiProperty({ description: 'milage of car', example: '50000' })
  milage: number;

  // @Transform(({ value }) => parseInt(value))
  // @IsNumber()
  // @Min(0)
  // @Max(100000)
  // price: number;
}
