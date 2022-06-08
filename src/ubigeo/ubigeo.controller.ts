/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, HttpCode, HttpStatus, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReqWithToken } from 'src/auth/req-with-token.interface';
import { UbigeoService } from './ubigeo.service';

@Controller('ubigeo')
export class UbigeoController {

    constructor(private readonly ubigeoService: UbigeoService){
    }

    @Get('department')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard())
    async getDepartments(@Req() req: IReqWithToken){
      return this.ubigeoService.listDepartments();
    }

    @Get('province')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard())
    async getProvinces(@Req() req: IReqWithToken, @Query('departmentId') departmentId: string){
      return this.ubigeoService.listProvinces(departmentId);
    }
    
    @Get('district')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard())
    async getDistricts(@Req() req: IReqWithToken, @Query('departmentId') departmentId: string, @Query('provinceId') provinceId: string){
      return this.ubigeoService.listDistricts(departmentId, provinceId);
    }
}
