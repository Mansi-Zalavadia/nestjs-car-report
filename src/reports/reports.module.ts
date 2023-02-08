import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from 'src/users/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'topsecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  //exports: [JWTStrategy, PassportModule],
})
export class ReportsModule {}
