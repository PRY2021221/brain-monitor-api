/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomLoggerService } from '../logger/custom-logger.service';
import { DepartmentRepository } from './repositories/department.repository';
import { DistrictRepository } from './repositories/district.repository';
import { ProvinceRepository } from './repositories/province.repository';
import { DepartmentDto, DistrictDto, ProvinceDto } from './ubigeo.dto';
import { UbigeoFactory } from './ubigeo.factory';

@Injectable()
export class UbigeoService {
    constructor(
        private readonly logger: CustomLoggerService,
        @InjectRepository(DepartmentRepository)
        private readonly _departmentRepository: DepartmentRepository,
        @InjectRepository(ProvinceRepository)
        private readonly _provinceRepository: ProvinceRepository,
        @InjectRepository(DistrictRepository)
        private readonly _districtRepository: DistrictRepository,
    ){
        this.logger = new CustomLoggerService(UbigeoService.name);
    }

    async listDepartments(): Promise<DepartmentDto[]>{
        const departments = await this._departmentRepository.find();

        return departments.map((department) => UbigeoFactory.convertDepartmentEntityToDto(department));
    }

    async listProvinces(departmentId: string): Promise<ProvinceDto[]>{
        const department = await this._departmentRepository.findOne({where: { id: departmentId }});
        const provinces = await this._provinceRepository.find({ where: { departmentId }});
        return provinces.map((province) => UbigeoFactory.convertProvinceEntityToDto(department,province));
    }

    async listDistricts(departmentId: string, provinceId: string): Promise<DistrictDto[]>{
        const department = await this._departmentRepository.findOne({where: { id: departmentId }});
        const province = await this._provinceRepository.findOne({where: { id: provinceId }});
        const districts = await this._districtRepository.find({ where: { departmentId, provinceId }});
        return districts.map((district) => UbigeoFactory.convertDistrictEntityToDto(department, province, district));
    }


}
