import { EntityRepository, Repository } from "typeorm";
import { Treatment } from "../entities/treatment.entity";

@EntityRepository(Treatment)
export class TreatmentRepository extends Repository<Treatment> {

}
