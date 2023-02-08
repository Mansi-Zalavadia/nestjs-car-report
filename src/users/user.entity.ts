import { targetModulesByContainer } from '@nestjs/core/router/router-module';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Report } from '../reports/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
//import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id of user', example: '1' })
  id: number;

  @Column()
  @ApiProperty({ description: 'email of user', example: 'user@gmail.com' })
  email: string;

  //@Exclude() //Sometimes you want to skip some properties during transformation. This can be done using @Exclude decorator:
  @Column()
  @ApiProperty({ description: 'password of user', example: 'hsdghsd' })
  password: string;

  @Column({ default: true })
  // @ApiProperty({description:''})
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  //@ApiProperty({description:''})
  reports: Report[];
}
