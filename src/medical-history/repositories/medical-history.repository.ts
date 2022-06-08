import { EntityRepository, Repository } from "typeorm";
import { MedicalHistory } from "../entities/medical-history.entity";

@EntityRepository(MedicalHistory)
export class MedicalHistoryRepository extends Repository<MedicalHistory> {

}
