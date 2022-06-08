export class DepartmentDto {
    id: string;
      
    name: string;
}


export class ProvinceDto {
    id: string;
      
    name: string;

    department: string;

    departmentId: string;
}

export class DistrictDto {
    id: string;
      
    name: string;

    province: string;

    provinceId: string;

    department: string;

    departmentId: string;
}