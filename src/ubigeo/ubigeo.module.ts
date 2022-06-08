import { UbigeoController } from './ubigeo.controller';
import { UbigeoService } from './ubigeo.service';
/*
https://docs.nestjs.com/modules
*/

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CustomLoggerModule } from 'src/logger/custom-logger.module';
import { DepartmentRepository } from './repositories/department.repository';
import { DistrictRepository } from './repositories/district.repository';
import { ProvinceRepository } from './repositories/province.repository';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    CustomLoggerModule,
    TypeOrmModule.forFeature([
      DepartmentRepository,
      DistrictRepository,
      ProvinceRepository,
    ]),
  ],
  controllers: [UbigeoController],
  providers: [UbigeoService],
})
export class UbigeoModule {}
