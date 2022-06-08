/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomLoggerService } from '../logger/custom-logger.service';
import { CreatePatientDto } from './patient.dto';
import { PatientStatus } from './patient.entity';
import { PatientFactory } from './patient.factory';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {

    constructor(
        private readonly logger: CustomLoggerService,
        @InjectRepository(PatientRepository)
        private readonly _patientRepository: PatientRepository,
  ) {
    this.logger = new CustomLoggerService(PatientService.name);
  }

  async findPatientByDni(dni: string){
      return this._patientRepository.findOne({where:{dni,status: PatientStatus.ACTIVE}});
  }

  async createPatient(createPatientDto: CreatePatientDto,userId: number) : Promise<any>{
    const patientEntity = PatientFactory.convertCreateDtoToEntity(createPatientDto, userId);
    await patientEntity.save();

    return {
        patientId: patientEntity.id
    };
  }

  async findPatientById(id: number){
      return this._patientRepository.findOne({where: { id }});
  }

}
