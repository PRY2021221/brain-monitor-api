import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
/*
https://docs.nestjs.com/modules
*/

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientRepository } from './patient.repository';
import { CustomLoggerModule } from '../logger/custom-logger.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientRepository]),
    CustomLoggerModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
