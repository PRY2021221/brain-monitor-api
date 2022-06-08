import { Department } from "./entities/department.entity";
import { District } from "./entities/district.entity";
import { Province } from "./province.entity";
import { DepartmentDto, DistrictDto, ProvinceDto } from "./ubigeo.dto";

export class UbigeoFactory {
    public static convertDepartmentEntityToDto(department: Department): DepartmentDto{
        const departmentDto = new DepartmentDto();
        departmentDto.id = department.id;
        departmentDto.name = department.name;

        return departmentDto;
    }

    public static convertDistrictEntityToDto(department: Department, province: Province, district: District): DistrictDto{
        const districtDto = new DistrictDto();
        districtDto.id = district.id;
        districtDto.name = district.name;
        
        districtDto.province = province.name;
        districtDto.provinceId = province.id;

        districtDto.department = department.name;
        districtDto.departmentId = department.id;

        return districtDto;
    }

    public static convertProvinceEntityToDto(department: Department, province: Province): ProvinceDto{
        const provinceDto = new ProvinceDto();
        provinceDto.id = province.id;
        provinceDto.name = province.name;
        
        provinceDto.department = department.name;
        provinceDto.departmentId = department.id;

        return provinceDto;
    }

}