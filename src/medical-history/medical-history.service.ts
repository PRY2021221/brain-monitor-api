/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CustomLoggerService } from '../logger/custom-logger.service';
import { AssignmentRequestRepository } from './repositories/assignment-request.repository';
import { MagneticResonanceRepository } from './repositories/magnetic-resonance.repository';
import { MedicalHistoryRepository } from './repositories/medical-history.repository';
import { TreatmentRepository } from './repositories/treatment.repository';
import {
  AddAssignmentRequestDto,
  AddDiagnosisDescription,
  AddTreatmentDto,
  CreateMedicalHistoryDto,
  GetDiagnosisDescription,
  GetMedicalHistoryDto,
} from './medical-history.dto';
import { MedicalHistoryFactory } from './medical-history.factory';
import { MagneticResonance } from './entities/magnetic-resonance.entity';
import { MedicalHistory } from './entities/medical-history.entity';

import {
  AssignmentRequestStatus,
  AssignmentStatus,
  MagneticResonanceStatus,
  MecialHistoryStatus,
  PriorizationType,
  TreatmentName,
  TreatmentStatus,
} from './entities/enums';
import { PaginationOptionsInterface } from 'src/utils/pagination/pagination.options.interface';
import { PaginationFactory } from 'src/utils/pagination/pagination.factory';
import { Treatment } from './entities/treatment.entity';
import { AssignmentRequest } from './entities/assignment-request.entity';
import { Gender } from 'src/patient/patient.entity';
import { In } from 'typeorm';
import { DateUtil } from 'src/utils/date-util';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

interface MagneticResonanceInput {
  resonanceAreaName: string;
  medicalHistoryId: number;
  filename: string;
}

@Injectable()
export class MedicalHistoryService {
  constructor(
    private readonly logger: CustomLoggerService,
    @InjectRepository(MedicalHistoryRepository)
    private readonly _medicalHistoryRepo: MedicalHistoryRepository,
    @InjectRepository(MagneticResonanceRepository)
    private readonly _magneticResonanceRepo: MagneticResonanceRepository,
    @InjectRepository(AssignmentRequestRepository)
    private readonly _assignmentRequestRepo: AssignmentRequestRepository,
    @InjectRepository(TreatmentRepository)
    private readonly _treatmentRepo: TreatmentRepository,
    private readonly cloudinaryService: CloudinaryService
  ) {
    this.logger = new CustomLoggerService(MedicalHistoryService.name);
  }

  // Medical Histories functions

  async createMedicalHistory(createMedicalHistory: CreateMedicalHistoryDto) {
    const medicalHistoryEntity =
      MedicalHistoryFactory.convertCreateDtoToEntity(createMedicalHistory);
    // TODO: valid exist patient

    await medicalHistoryEntity.save();

    return {
      medicalHistoryId: medicalHistoryEntity.id,
    };
  }

  async getMedicalHistoriesByDoctorId(
    doctorId: number,
    options: PaginationOptionsInterface,
  ) {
    options.limit = options.limit ? options.limit : 10;
    options.page = options.page > 0 ? options.page : 1;
    options.query = options.query ? options.query : '';
    const [data, total] = await this._medicalHistoryRepo.findAndCount({
      take: options.limit,
      skip: options.limit * (options.page - 1),
      where: {
        status: MecialHistoryStatus.ACTIVE,
        patient: { doctor: { id: doctorId } },
      },
      order: { createdAt: 'DESC' },
      relations: ['patient', 'patient.doctor'],
    });

    const results = await Promise.all(
      data.map(async (medicalHistory) => {
        return MedicalHistoryFactory.convertEntityToGetMedicalHistoryDto(
          medicalHistory,
        );
      }),
    );

    const response =
      PaginationFactory.buildPaginationResult<GetMedicalHistoryDto>(
        results,
        options.limit,
        options.page,
        total,
      );
    return response;
  }

  // Magnetic Resonance functions

  async addMagneticResonance({
    resonanceAreaName,
    medicalHistoryId,
    filename,
  }: MagneticResonanceInput) {
    const magneticResonanceEntity = new MagneticResonance();
    magneticResonanceEntity.filename = filename;
    magneticResonanceEntity.resonanceAreaName = resonanceAreaName;
    const medicalHistory = new MedicalHistory();
    medicalHistory.id = medicalHistoryId;

    // TODO: valid exist medical history

    magneticResonanceEntity.medicalHistory = medicalHistory;
    const response = await this.cloudinaryService.uploadImage(`${process.cwd()}/public/magnetic-resonance/${filename}`, `/brain-monitor/magnetic-resonance/${process.env.NODE_ENV}/magnetic-resonance-${medicalHistoryId}`);

    if(response){
      magneticResonanceEntity.cloudinary_folder = response.folder;
      magneticResonanceEntity.cloudinary_public_id = response.public_id;
      magneticResonanceEntity.cloudinary_version_id = response.version_id;
      magneticResonanceEntity.resonanceImageLink = response.secure_url;
      await magneticResonanceEntity.save();
    }

    // TODO: THROW EXCEPTION THAT OCCURRED AN ERROR IN EXTERNAL SERVICE
    
  }

  async getMagneticResonances(userId: number, medicalHistoryId: number) {
    // TODO: valid exist medical history

    const magneticResonances = await this._magneticResonanceRepo.find({
      where: {
        medicalHistory: {
          id: medicalHistoryId,
        },
        status: MagneticResonanceStatus.ACTIVE,
      },
      relations: ['medicalHistory'],
      order: {
        createdAt: 'DESC'
      }
    });
    return magneticResonances.map((magneticResonance) =>
      MedicalHistoryFactory.convertEntityToGetMagneticResonanceDto(
        magneticResonance,
      ),
    );
  }

  async deleteMagneticResonance(magneticResonanceId: number) {
    const magneticResonance = await this._magneticResonanceRepo.findOne({
      where: {
        id: magneticResonanceId,
        status: MagneticResonanceStatus.ACTIVE,
      },
    });

    if (!magneticResonance) {
      // TODO: ADD EXCEPTION NOT FOUND
      return;
    }
    const cloudinary_public_id = magneticResonance.cloudinary_public_id;
    magneticResonance.status = MagneticResonanceStatus.INACTIVE;
    await magneticResonance.save();

    // await this.cloudinaryService.deleteImage(cloudinary_public_id);
  }

  // Diagnosis Functions

  async getMedicalHistoryDiagnosis(medicalHistoryId: number) {
    // TODO: valid exist medical history
    // TODO: Call AWS and get percentage diagnosis

    return {
      percentage: 0.8,
    };
  }

  async getDiagnosisDescription(medicalHistoryId: number){
    const medicalHistory = await this._medicalHistoryRepo.findOne({
      where: { id: medicalHistoryId, status: MecialHistoryStatus.ACTIVE },
    });

    if (!medicalHistory) {
      // TODO: ADD EXCEPTION NOT FOUND
      return;
    }
    const diagnosisDto = new GetDiagnosisDescription();
    diagnosisDto.diagnosisDescription = medicalHistory.diagnosisDescription;
    diagnosisDto.treatmentDescription = medicalHistory.treatmentDescription;
    diagnosisDto.accuracyPercentage = parseFloat(medicalHistory.accuracyPercentage.toString());
    diagnosisDto.medicalHistoryId = medicalHistoryId;

    return diagnosisDto;
  } 

  async addDiagnosisDescription(
    medicalHistoryId: number,
    addDiagnosisDescription: AddDiagnosisDescription,
  ) {
    const medicalHistory = await this._medicalHistoryRepo.findOne({
      where: { id: medicalHistoryId, status: MecialHistoryStatus.ACTIVE },
    });

    if (!medicalHistory) {
      // TODO: ADD EXCEPTION NOT FOUND
      return;
    }

    medicalHistory.diagnosisDescription =
      addDiagnosisDescription.diagnosisDescription;
    medicalHistory.treatmentDescription =
      addDiagnosisDescription.treatmentDescription;
    await medicalHistory.save();
  }

  async addMockPercentageToMedicalHistory(
    medicalHistoryId: number,
    percentage: number,
  ) {
    const medicalHistory = await this._medicalHistoryRepo.findOne({
      where: { id: medicalHistoryId, status: MecialHistoryStatus.ACTIVE },
    });

    if (!medicalHistory) {
      // TODO: ADD EXCEPTION NOT FOUND
      return;
    }

    medicalHistory.accuracyPercentage = percentage;
    await medicalHistory.save();
  }

  // Treatment functions

  async addTreatment(
    medicalHistoryId: number,
    addTreatmentDto: AddTreatmentDto,
  ) {
    // TODO: ADD VALIDATION EXIST MEDICAL HISTORY

    const treatment = new Treatment();
    treatment.medicalHistory = new MedicalHistory();
    treatment.medicalHistory.id = medicalHistoryId;
    treatment.treatmentName = addTreatmentDto.treatmentName;
    treatment.observation = addTreatmentDto.observation;
    await treatment.save();
  }

  async getTreatmentsByMedicalHistory(
    medicalHistoryId: number,
    options: PaginationOptionsInterface,
  ) {
    // TODO: ADD VALIDATION EXIST MEDICAL HISTORY

    options.limit = options.limit ? options.limit : 10;
    options.page = options.page > 0 ? options.page : 1;
    options.query = options.query ? options.query : '';
    const [data, total] = await this._treatmentRepo.findAndCount({
      take: options.limit,
      skip: options.limit * (options.page - 1),
      where: {
        status: TreatmentStatus.ACTIVE,
        medicalHistory: { id: medicalHistoryId },
      },
      order: { createdAt: 'DESC' },
      relations: ['medicalHistory'],
    });

    const totalSurgeries = await this._treatmentRepo.count({
      where: {
        status: TreatmentStatus.ACTIVE,
        medicalHistory: { id: medicalHistoryId },
        treatmentName: TreatmentName.SURGERY,
      },
      relations: ['medicalHistory'],
    });

    const totalChemotherapies = await this._treatmentRepo.count({
      where: {
        status: TreatmentStatus.ACTIVE,
        medicalHistory: { id: medicalHistoryId },
        treatmentName: TreatmentName.CHEMOTHERAPY,
      },
      relations: ['medicalHistory'],
    });

    const results = await Promise.all(
      data.map(async (treatment) => {
        return MedicalHistoryFactory.convertEntityToGetTreatmentDto(treatment);
      }),
    );

    const response = PaginationFactory.buildPaginationResult<any>(
      results,
      options.limit,
      options.page,
      total,
    );
    return {
      ...response,
      totalSurgeries,
      totalChemotherapies,
    };
  }

  // Assign Requests functions
  async addAssignRequest(
    medicalHistoryId: number,
    addAssignRequestDto: AddAssignmentRequestDto,
  ) {
    const existRequestPending = await this._assignmentRequestRepo.findOne({
      where: {
        medicalHistory: { id: medicalHistoryId },
        assignmentRequestStatus: AssignmentRequestStatus.PENDING,
      },
      relations: ['medicalHistory'],
    });
    if (existRequestPending) {
      // TODO: ADD ERROR MESSAGE THAT HAVE A PENDING REQUEST
      return;
    }

    const assignRequest = new AssignmentRequest();
    assignRequest.medicalHistory = new MedicalHistory();
    assignRequest.medicalHistory.id = medicalHistoryId;
    assignRequest.assignmentStatus = addAssignRequestDto.assignmentStatus;
    assignRequest.prioritizationType = addAssignRequestDto.prioritization;
    await assignRequest.save();
  }

  async getAssignmentRequests(
    medicalHistoryId: number,
    options: PaginationOptionsInterface,
  ) {
    // TODO: ADD VALIDATION EXIST MEDICAL HISTORY
    const medicalHistory = await this._medicalHistoryRepo.findOne({
      where: { id: medicalHistoryId, status: MecialHistoryStatus.ACTIVE },
    });

    options.limit = options.limit ? options.limit : 10;
    options.page = options.page > 0 ? options.page : 1;
    options.query = options.query ? options.query : '';
    const [data, total] = await this._assignmentRequestRepo.findAndCount({
      take: options.limit,
      skip: options.limit * (options.page - 1),
      where: {
        medicalHistory: { id: medicalHistoryId },
      },
      order: { updatedAt: 'DESC' },
      relations: ['medicalHistory'],
    });

    const results = await Promise.all(
      data.map(async (assignmentRequest) => {
        return MedicalHistoryFactory.convertEntityToGetAssignmentRequestDto(
          assignmentRequest,
        );
      }),
    );

    const currentPrioritization = medicalHistory.prioritizationType;
    const currentAssignmentStatus = medicalHistory.assignmentStatus;

    const response = PaginationFactory.buildPaginationResult<any>(
      results,
      options.limit,
      options.page,
      total,
    );
    return {
      ...response,
      currentPrioritization,
      currentAssignmentStatus,
    };
  }

  async getAdminAssignmentRequests(options: PaginationOptionsInterface) {
    options.limit = options.limit ? options.limit : 10;
    options.page = options.page > 0 ? options.page : 1;
    options.query = options.query ? options.query : '';
    const [data, total] = await this._assignmentRequestRepo.findAndCount({
      take: options.limit,
      skip: options.limit * (options.page - 1),
      where: { assignmentRequestStatus: AssignmentRequestStatus.PENDING },
      order: { createdAt: 'ASC' },
      relations: [
        'medicalHistory',
        'medicalHistory.patient',
        'medicalHistory.patient.doctor',
      ],
    });

    const results = await Promise.all(
      data.map(async (assignmentRequest) => {
        return MedicalHistoryFactory.convertEntityToGetAdminAssignmentRequestDto(
          assignmentRequest,
        );
      }),
    );

    const response = PaginationFactory.buildPaginationResult<any>(
      results,
      options.limit,
      options.page,
      total,
    );
    return response;
  }

  async changeAssignmentRequestStatus(
    assignmentRequestId: number,
    assigmentRequestStatus: AssignmentRequestStatus,
  ) {
    const assigmentRequest = await this._assignmentRequestRepo.findOne({
      where: {
        id: assignmentRequestId,
        assignmentRequestStatus: AssignmentRequestStatus.PENDING,
      },
      relations: ['medicalHistory'],
    });

    if (!assigmentRequest) {
      // TODO:  ADD ERROR MESSAGE THAT ASSIGMENT REQUEST IS NOT PENDING STATUS
      return;
    }

    assigmentRequest.assignmentRequestStatus = assigmentRequestStatus;
    await assigmentRequest.save();

    if (assigmentRequestStatus === AssignmentRequestStatus.APPROVED) {
      await this._medicalHistoryRepo.update(
        { id: assigmentRequest.medicalHistory.id },
        {
          prioritizationType: assigmentRequest.prioritizationType,
          assignmentStatus: assigmentRequest.assignmentStatus,
        },
      );
    }
  }

  // Dashboard
  async getDashboardMetadata(
    doctorId: number,
    intervention: TreatmentName,
    genderFilter: Gender,
    assignmentStatusFilter: AssignmentStatus,
    prioritization: PriorizationType,
  ) {
    let data = await this._medicalHistoryRepo.find({
      where: {
        patient: {
          doctor: {
            id: doctorId,
          },
          gender: genderFilter
            ? In([genderFilter])
            : In([Gender.FEMALE, Gender.MALE, Gender.NONE]),
        },
        assignmentStatus: assignmentStatusFilter
          ? In([assignmentStatusFilter])
          : In([
              AssignmentStatus.ACTIVE,
              AssignmentStatus.INACTIVE,
              AssignmentStatus.NOT_ASSIGNED,
            ]),
        prioritizationType: prioritization
          ? In([prioritization])
          : In([
              PriorizationType.HIGH,
              PriorizationType.LOW,
              PriorizationType.MEDIUM,
              PriorizationType.NOT_ASSIGNED,
            ]),
      },
      relations: ['patient', 'patient.doctor', 'treatments'],
    });
    if (intervention) {
      data = data.filter((medicalHistory) => {
        return medicalHistory.treatments
          .map((x) => x.treatmentName)
          .includes(intervention);
      });
    }
    const totalPatientsWithCancer = {
      Y: 0,
      N: 0,
    };
    const percentageOfPrioritizations = {
      H: 0,
      M: 0,
      L: 0,
    };

    const percentageOfPatientsStatus = {
      A: 0,
      I: 0,
    };

    const interventionsByAge = {};
    for (let i = 0; i < 18; i++) {
      interventionsByAge[i] ??= { surgeries: 0, chemotherapies: 0 };
    }
    const totalPatients = data.length;
    const activePatients = data.filter(
      (x) => x.assignmentStatus === AssignmentStatus.ACTIVE,
    ).length;

    data.forEach((medicalHistory) => {
      const age = DateUtil.getAgeFromDate(medicalHistory.patient.birthDate);
      if (age < 18) {
        interventionsByAge[age].surgeries += medicalHistory.treatments.filter(
          (x) => x.treatmentName === TreatmentName.SURGERY,
        ).length;
        interventionsByAge[age].chemotherapies +=
          medicalHistory.treatments.filter(
            (x) => x.treatmentName === TreatmentName.CHEMOTHERAPY,
          ).length;
      }
      if (parseFloat(medicalHistory.accuracyPercentage.toString()) >= 0.2) {
        totalPatientsWithCancer.Y++;
      } else {
        totalPatientsWithCancer.N++;
      }
      if (
        [
          PriorizationType.HIGH,
          PriorizationType.LOW,
          PriorizationType.MEDIUM,
        ].includes(medicalHistory.prioritizationType)
      )
        percentageOfPrioritizations[medicalHistory.prioritizationType]++;
      if (
        [AssignmentStatus.ACTIVE, AssignmentStatus.INACTIVE].includes(
          medicalHistory.assignmentStatus,
        )
      )
        percentageOfPatientsStatus[medicalHistory.assignmentStatus]++;
    });
    return {
      totalPatients,
      activePatients,
      totalPatientsWithCancer,
      percentageOfPrioritizations,
      percentageOfPatientsStatus,
      interventionsByAge,
    };
  }

  async getDashboardAdminMetadata(
    intervention: TreatmentName,
    genderFilter: Gender,
    assignmentStatusFilter: AssignmentStatus,
    prioritization: PriorizationType,
  ) {
    let data = await this._medicalHistoryRepo.find({
      where: {
        patient: {
          gender: genderFilter
            ? In([genderFilter])
            : In([Gender.FEMALE, Gender.MALE, Gender.NONE]),
        },
        assignmentStatus: assignmentStatusFilter
          ? In([assignmentStatusFilter])
          : In([
              AssignmentStatus.ACTIVE,
              AssignmentStatus.INACTIVE,
              AssignmentStatus.NOT_ASSIGNED,
            ]),
        prioritizationType: prioritization
          ? In([prioritization])
          : In([
              PriorizationType.HIGH,
              PriorizationType.LOW,
              PriorizationType.MEDIUM,
              PriorizationType.NOT_ASSIGNED,
            ]),
      },
      relations: ['patient', 'patient.doctor', 'treatments'],
    });
    if (intervention) {
      data = data.filter((medicalHistory) => {
        return medicalHistory.treatments
          .map((x) => x.treatmentName)
          .includes(intervention);
      });
    }
    const totalPatientsWithCancer = {
      Y: 0,
      N: 0,
    };
    const percentageOfPrioritizations = {
      H: 0,
      M: 0,
      L: 0,
    };

    const percentageOfPatientsStatus = {
      A: 0,
      I: 0,
    };

    const interventionsByAge = {};
    for (let i = 0; i < 18; i++) {
      interventionsByAge[i] ??= { surgeries: 0, chemotherapies: 0 };
    }
    const totalPatients = data.length;
    const activePatients = data.filter(
      (x) => x.assignmentStatus === AssignmentStatus.ACTIVE,
    ).length;

    data.forEach((medicalHistory) => {
      const age = DateUtil.getAgeFromDate(medicalHistory.patient.birthDate);
      if (age < 18) {
        interventionsByAge[age].surgeries += medicalHistory.treatments.filter(
          (x) => x.treatmentName === TreatmentName.SURGERY,
        ).length;
        interventionsByAge[age].chemotherapies +=
          medicalHistory.treatments.filter(
            (x) => x.treatmentName === TreatmentName.CHEMOTHERAPY,
          ).length;
      }
      if (parseFloat(medicalHistory.accuracyPercentage.toString()) >= 0.2) {
        totalPatientsWithCancer.Y++;
      } else {
        totalPatientsWithCancer.N++;
      }
      if (
        [
          PriorizationType.HIGH,
          PriorizationType.LOW,
          PriorizationType.MEDIUM,
        ].includes(medicalHistory.prioritizationType)
      )
        percentageOfPrioritizations[medicalHistory.prioritizationType]++;
      if (
        [AssignmentStatus.ACTIVE, AssignmentStatus.INACTIVE].includes(
          medicalHistory.assignmentStatus,
        )
      )
        percentageOfPatientsStatus[medicalHistory.assignmentStatus]++;
    });
    return {
      totalPatients,
      activePatients,
      totalPatientsWithCancer,
      percentageOfPrioritizations,
      percentageOfPatientsStatus,
      interventionsByAge,
    };
  }
}
