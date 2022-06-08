import { EntityRepository, Repository } from "typeorm";
import { AssignmentRequest } from "../entities/assignment-request.entity";

@EntityRepository(AssignmentRequest)
export class AssignmentRequestRepository extends Repository<AssignmentRequest> {

}
