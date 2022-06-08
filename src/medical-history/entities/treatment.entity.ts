import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TreatmentName, TreatmentStatus } from './enums';
import { MedicalHistory } from './medical-history.entity';



@Entity('treatments')
export class Treatment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    name: 'treatment_name',
    enum: TreatmentName,
    default: TreatmentName.OTHER,
  })
  treatmentName: TreatmentName;

  @Column({
    name: 'observation',
    type: 'varchar',
    length: 500,
    nullable: true,
    default: '',
  })
  observation: string;

  @ManyToOne(() => MedicalHistory, (medicalHistory: MedicalHistory) => medicalHistory.treatments, { primary: false } )
  medicalHistory: MedicalHistory;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    name: 'status',
    enum: TreatmentStatus,
    default: TreatmentStatus.ACTIVE,
  })
  status: TreatmentStatus;
}
