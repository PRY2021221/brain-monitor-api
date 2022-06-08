/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReqWithToken } from '../auth/req-with-token.interface';
import { CreatePatientDto } from './patient.dto';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {

    constructor(private readonly patientService: PatientService){
    }

    @Get('dni/:dni')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard())
    async getUserTokenInfo(@Req() req: IReqWithToken, @Param('dni') dni: string){
      return this.patientService.findPatientByDni(dni);
    }

    @Post('')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard())
    async createPatient(@Req() req: IReqWithToken, @Body()createPatientDto: CreatePatientDto){
      return this.patientService.createPatient(createPatientDto, req.user.id);
    }

}
