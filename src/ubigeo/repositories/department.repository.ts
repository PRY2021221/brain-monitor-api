import { EntityRepository, Repository } from "typeorm";
import { Department } from "../entities/department.entity";

@EntityRepository(Department)
export class DepartmentRepository extends Repository<Department> {

}
