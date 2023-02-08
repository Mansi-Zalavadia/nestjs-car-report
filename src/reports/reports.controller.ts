import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { createReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { serialize } from 'src/interceptors/serialize.iterceptor';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { query } from 'express';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  @ApiOkResponse({ description: 'Get an estimate for the cars' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Post()
  @ApiCreatedResponse({ description: 'report how much vechicle sold for' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AuthGuard)
  @serialize(ReportDto)
  createReport(@Body() body: createReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'Approve or reject report submitted by user' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
