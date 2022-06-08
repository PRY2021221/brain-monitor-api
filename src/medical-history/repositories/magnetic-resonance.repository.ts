import { EntityRepository, Repository } from "typeorm";
import { MagneticResonance } from "../entities/magnetic-resonance.entity";

@EntityRepository(MagneticResonance)
export class MagneticResonanceRepository extends Repository<MagneticResonance> {

}
