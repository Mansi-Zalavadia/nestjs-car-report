import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { createReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createEstimate({ make, model, lng, lat, year, milage }: GetEstimateDto) {
    return (
      this.repo
        .createQueryBuilder()
        .select('AVG(price)', 'price')

        .where('make=:make', { make }) //filter apply here make define in request only those object will run
        //:make is string value come from {getestimateDto}
        .andWhere('model=:model', { model }) // andwhere is used for another condition
        .andWhere('lng -:lng BETWEEN -5 AND 5', { lng })
        .andWhere('lat -:lat BETWEEN -5 AND 5', { lat })
        .andWhere('year -:year BETWEEN -3 AND 3', { year })
        .andWhere('approved is FALSE')
        .orderBy('ABS(milage -:milage)', 'DESC')
        .setParameters({ milage })
        .limit(3)
        .getRawOne()
    );
  }

  create(reportDto: createReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    //const report = await this.repo.findOne({ where: { id: parseInt(id) } });
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });

    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
