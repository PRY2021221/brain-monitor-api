import { EntityRepository, Repository } from "typeorm";
import { Province } from "../province.entity";

@EntityRepository(Province)
export class ProvinceRepository extends Repository<Province> {

}
