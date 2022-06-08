import { AssignmentRequestStatus, AssignmentStatus, BloodType, HealthInsurance, MagneticResonanceStatus, PriorizationType, Relationship, TreatmentName, TreatmentStatus } from './entities/enums';

export class GetMedicalHistoryDto{
      patientName: string;
      registeredDate: Date;
      prioritization: PriorizationType;
      patientDni: string;
      patientAge: number;
      medicalHistoryId: number;
      patientId: number;
      doctorId: number;
      accuracyPercentage: number;
}

export class CreateMedicalHistoryDto {
  birthPlace: string;

  healthInsurance: HealthInsurance;

  bloodType: BloodType;

  hasRelativeWithCancer: boolean;

  weight: number;

  height: number;

  hadHospitalizations: boolean;

  hadTransfusions: boolean;

  hadSurgeries: boolean;

  haveAllergies: boolean;

  existingDiseases: string;

  responsibleName: string;

  responsibleRelationship: Relationship;

  responsiblePhoneNumber: string;

  responsibleDni: string;

  patientId: number;
}

export class GetMagneticResonanceDto {
  id: number;
  resonanceAreaName: string;
  resonanceImageLink: string;
  filename: string;
  medicalHistoryId: number;
  status: MagneticResonanceStatus;
  createdAt: Date;
}

export class AddDiagnosisDescription {
      diagnosisDescription: string;
      treatmentDescription: string;
}

export class GetDiagnosisDescription {
  diagnosisDescription: string;
  treatmentDescription: string;
  medicalHistoryId: number;
  accuracyPercentage: number;
}

export class AddTreatmentDto {
  treatmentName: TreatmentName;
  observation : string;
}

export class GetTreatmentDto {
  id: number;
  treatmentName: TreatmentName;
  createdAt: Date;
  observation: string;
  status: TreatmentStatus;
}

export class AddAssignmentRequestDto {
  prioritization: PriorizationType;
  assignmentStatus: AssignmentStatus;
}

export class GetAssignmentRequestDto {
  id: number;
  prioritization: PriorizationType;
  assignmentStatus: AssignmentStatus;
  requestStatus: AssignmentRequestStatus;
  updatedAt: Date;
}

export class GetAdminAssignmentRequestDto {
  id: number;
  patientName: string;
  createdAt: Date;
  prioritization: PriorizationType;
  patientDni: string;
  assignmentStatus: AssignmentStatus;
}