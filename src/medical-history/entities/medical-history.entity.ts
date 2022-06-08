import { Patient } from '../../patient/patient.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AssignmentRequest } from './assignment-request.entity';
import { MagneticResonance } from './magnetic-resonance.entity';
import { Treatment } from './treatment.entity';
import { AssignmentStatus, BloodType, HealthInsurance, MecialHistoryStatus, PriorizationType, Relationship } from './enums';
import { Transform } from 'class-transformer';



@Entity('medical_histories')
export class MedicalHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'birth_place',
    type: 'varchar',
    length: 200,
    nullable: true,
    default: '',
  })
  birthPlace: string;

  @Column({
    type: 'enum',
    name: 'health_insurance',
    enum: HealthInsurance,
    default: HealthInsurance.NONE,
  })
  healthInsurance: HealthInsurance;

  @Column({
    type: 'enum',
    name: 'blood_type',
    enum: BloodType,
    default: BloodType.UNKNOW,
  })
  bloodType: BloodType;

  @Column({
    name: 'has_relative_with_cancer',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  hasRelativeWithCancer: boolean;

  @Column({
    type: 'int',
    name: 'weight',
    nullable: true,
    default: 0,
  })
  weight: number;

  @Column({
    type: 'int',
    name: 'height',
    nullable: true,
    default: 0,
  })
  height: number;

  @Column({
    name: 'had_hospitalizations',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  hadHospitalizations: boolean;

  @Column({
    name: 'had_transfusions',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  hadTransfusions: boolean;

  @Column({
    name: 'had_surgeries',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  hadSurgeries: boolean;

  @Column({
    name: 'have_allergies',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  haveAllergies: boolean;

  @Column({
    name: 'existing_diseases',
    type: 'varchar',
    length: 300,
    nullable: true,
    default: '',
  })
  existingDiseases;

  @Column({
    name: 'responsible_name',
    type: 'varchar',
    length: 100,
    nullable: true,
    default: '',
  })
  responsibleName: string;

  @Column({
    type: 'enum',
    name: 'responsible_relationship',
    enum: Relationship,
    default: Relationship.OTHER,
  })
  responsibleRelationship: Relationship;

  @Column({
    name: 'responsible_phone_number',
    type: 'varchar',
    length: 12,
    nullable: true,
    default: '',
  })
  responsiblePhoneNumber: string;

  @Column({
    name: 'responsible_dni',
    type: 'varchar',
    length: 8,
    nullable: true,
    default: '',
  })
  responsibleDni: string;

  @Column({
    name: 'diagnosis_description',
    type: 'varchar',
    length: 800,
    nullable: true,
    default: '',
  })
  diagnosisDescription: string;

  @Column({
    name: 'treatment_description',
    type: 'varchar',
    length: 800,
    nullable: true,
    default: '',
  })
  treatmentDescription: string;

  @Column({
    name: 'accuracy_percentage',
    type: 'decimal',
    nullable: true,
    default: 0,
  })
  accuracyPercentage: number;

  @Column({
    type: 'enum',
    name: 'prioritization_type',
    enum: PriorizationType,
    default: PriorizationType.NOT_ASSIGNED,
  })
  prioritizationType: PriorizationType;

  @Column({
    type: 'enum',
    name: 'assignment_status',
    enum: AssignmentStatus,
    default: AssignmentStatus.NOT_ASSIGNED,
  })
  assignmentStatus: AssignmentStatus;

  @ManyToOne(() => Patient, (patient: Patient) => patient.medicalHistories, { primary: false })
  patient: Patient;

  @OneToMany(() => Treatment, (treatment: Treatment) => treatment.medicalHistory)
  treatments: Treatment[];

  @OneToMany(() => MagneticResonance, (magneticResonance: MagneticResonance) => magneticResonance.medicalHistory)
  magneticResonances: MagneticResonance[];

  @OneToMany(() => AssignmentRequest, (assignmentRequest: AssignmentRequest) => assignmentRequest.medicalHistory)
  assignmentRequests: AssignmentRequest[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    name: 'status',
    enum: MecialHistoryStatus,
    default: MecialHistoryStatus.ACTIVE,
  })
  status: MecialHistoryStatus;
}
