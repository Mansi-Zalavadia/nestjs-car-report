import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class ApproveReportDto {
  @ApiProperty({ description: 'approved prop', example: 'true' })
  @IsBoolean()
  approved: boolean;
}
