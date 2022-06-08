import { Patient } from "src/patient/patient.entity";
import { DateUtil } from "src/utils/date-util";
import { AssignmentRequest } from "./entities/assignment-request.entity";
import { MagneticResonance } from "./entities/magnetic-resonance.entity";
import { MedicalHistory } from "./entities/medical-history.entity";
import { Treatment } from "./entities/treatment.entity";
import { CreateMedicalHistoryDto, GetAdminAssignmentRequestDto, GetAssignmentRequestDto, GetMagneticResonanceDto, GetMedicalHistoryDto, GetTreatmentDto } from "./medical-history.dto";

export class MedicalHistoryFactory {
    
    public static convertEntityToGetMedicalHistoryDto(medicalHistory: MedicalHistory){
        const getMedicalHistoryDto = new GetMedicalHistoryDto();
        getMedicalHistoryDto.medicalHistoryId = medicalHistory.id;
        getMedicalHistoryDto.patientDni = medicalHistory.patient.dni;
        getMedicalHistoryDto.doctorId = medicalHistory.patient.doctor.id;
        getMedicalHistoryDto.patientName = `${medicalHistory.patient.firstname} ${medicalHistory.patient.firstLastname} ${medicalHistory.patient.secondLastname}`;
        getMedicalHistoryDto.prioritization = medicalHistory.prioritizationType;
        getMedicalHistoryDto.registeredDate = DateUtil.getDateWithTimezone(medicalHistory.createdAt);
        getMedicalHistoryDto.patientAge = DateUtil.getAgeFromDate(medicalHistory.patient.birthDate);
        getMedicalHistoryDto.accuracyPercentage = parseFloat(medicalHistory.accuracyPercentage.toString());

        return getMedicalHistoryDto;
    }

    public static convertCreateDtoToEntity(createMedicalHistoryDto: CreateMedicalHistoryDto): MedicalHistory{
        const medicalHistory = new MedicalHistory();
        medicalHistory.birthPlace = createMedicalHistoryDto.birthPlace;
        medicalHistory.bloodType = createMedicalHistoryDto.bloodType;
        medicalHistory.existingDiseases = createMedicalHistoryDto.existingDiseases;
        medicalHistory.hadHospitalizations = createMedicalHistoryDto.hadHospitalizations;
        medicalHistory.hadSurgeries = createMedicalHistoryDto.hadSurgeries;
        medicalHistory.hadTransfusions = createMedicalHistoryDto.hadTransfusions;
        medicalHistory.haveAllergies = createMedicalHistoryDto.haveAllergies;
        medicalHistory.healthInsurance = createMedicalHistoryDto.healthInsurance;
        medicalHistory.height = createMedicalHistoryDto.height;
        medicalHistory.weight = createMedicalHistoryDto.weight;
        medicalHistory.responsibleDni = createMedicalHistoryDto.responsibleDni;
        medicalHistory.responsibleName = createMedicalHistoryDto.responsibleName;
        medicalHistory.responsiblePhoneNumber = createMedicalHistoryDto.responsiblePhoneNumber;
        medicalHistory.responsibleRelationship = createMedicalHistoryDto.responsibleRelationship;
        const patient = new Patient();
        patient.id = createMedicalHistoryDto.patientId;

        medicalHistory.patient = patient;

        return medicalHistory;
    }

    public static convertEntityToGetMagneticResonanceDto(magneticResonance: MagneticResonance): GetMagneticResonanceDto{
        const getMagneticResonanceDto = new GetMagneticResonanceDto();
        getMagneticResonanceDto.createdAt = DateUtil.getDateWithTimezone(magneticResonance.createdAt);
        getMagneticResonanceDto.filename = magneticResonance.filename;
        getMagneticResonanceDto.medicalHistoryId = magneticResonance.medicalHistory.id;
        getMagneticResonanceDto.resonanceAreaName = magneticResonance.resonanceAreaName;
        getMagneticResonanceDto.resonanceImageLink=  magneticResonance.resonanceImageLink;
        getMagneticResonanceDto.status = magneticResonance.status;
        getMagneticResonanceDto.id = magneticResonance.id;

        return getMagneticResonanceDto;
    }

    public static convertEntityToGetTreatmentDto(treatment: Treatment): GetTreatmentDto {
        const getTreatmentDto = new GetTreatmentDto();
        getTreatmentDto.id = treatment.id;
        getTreatmentDto.createdAt = DateUtil.getDateWithTimezone(treatment.createdAt);
        getTreatmentDto.observation = treatment.observation;
        getTreatmentDto.status = treatment.status;
        getTreatmentDto.treatmentName = treatment.treatmentName;

        return getTreatmentDto;
    }
    
    public static convertEntityToGetAssignmentRequestDto(assignmentRequest: AssignmentRequest) : GetAssignmentRequestDto{
        const getAssignmentRequestDto = new GetAssignmentRequestDto();
        getAssignmentRequestDto.id = assignmentRequest.id;
        getAssignmentRequestDto.updatedAt = DateUtil.getDateWithTimezone(assignmentRequest.updatedAt);
        getAssignmentRequestDto.prioritization = assignmentRequest.prioritizationType;
        getAssignmentRequestDto.requestStatus = assignmentRequest.assignmentRequestStatus;
        getAssignmentRequestDto.assignmentStatus = assignmentRequest.assignmentStatus;

        return getAssignmentRequestDto;
    }

    public static convertEntityToGetAdminAssignmentRequestDto(assignmentRequest: AssignmentRequest) : GetAdminAssignmentRequestDto{
        const getAssignmentRequestDto = new GetAdminAssignmentRequestDto();
        getAssignmentRequestDto.id = assignmentRequest.id;
        getAssignmentRequestDto.createdAt = DateUtil.getDateWithTimezone(assignmentRequest.medicalHistory.createdAt);
        getAssignmentRequestDto.prioritization = assignmentRequest.prioritizationType;
        getAssignmentRequestDto.assignmentStatus = assignmentRequest.assignmentStatus;
        getAssignmentRequestDto.patientDni = assignmentRequest.medicalHistory.patient.dni;
        const {firstname, firstLastname, secondLastname} = assignmentRequest.medicalHistory.patient;
        getAssignmentRequestDto.patientName = `${firstname} ${firstLastname} ${secondLastname}`; 
        return getAssignmentRequestDto;
    }
}