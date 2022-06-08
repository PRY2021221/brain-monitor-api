import { User } from '../auth/entities/user.entity';
import { MedicalHistory } from '../medical-history/entities/medical-history.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PatientStatus {
  ACTIVE = 'A',
  INACTIVE = 'I',
}

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
  NONE = 'N',
}

@Entity('patients')
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'firstname',
    type: 'varchar',
    length: 100,
    nullable: true,
    default: '',
  })
  firstname: string;

  @Column({
    name: 'first_lastname',
    type: 'varchar',
    length: 100,
    nullable: true,
    default: '',
  })
  firstLastname: string;

  @Column({
    name: 'second_lastname',
    type: 'varchar',
    length: 100,
    nullable: true,
    default: '',
  })
  secondLastname: string;

  @Column({
    name: 'registered_date',
    type: 'timestamptz',
    nullable: true,
  })
  registeredDate: Date;

  @Column({
    name: 'birth_date',
    type: 'timestamptz',
    nullable: true,
  })
  birthDate: Date;

  @Column({
    name: 'hospital_name',
    type: 'varchar',
    length: 200,
    nullable: true,
    default: '',
  })
  hospitalName: string;

  @Column({
    name: 'dni',
    type: 'varchar',
    length: 8,
    nullable: true,
    default: '',
  })
  dni: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 9,
    nullable: true,
    default: '',
  })
  phoneNumber: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: true,
    default: '',
  })
  email: string;

  @Column({
    name: 'ubigeo',
    type: 'varchar',
    length: 6,
    nullable: true,
    default: '000000',
  })
  ubigeo: string;

  @Column({
    name: 'address',
    type: 'varchar',
    length: 200,
    nullable: true,
    default: '',
  })
  address: string;

  @Column({
    type: 'enum',
    name: 'gender',
    enum: Gender,
    default: Gender.NONE,
  })
  gender: Gender;

  @ManyToOne(() => User, (user: User) => user.patients, { primary: false })
  doctor: User;

  @OneToMany(() => MedicalHistory, (medicalHistory: MedicalHistory) => medicalHistory.patient)
  medicalHistories: MedicalHistory[];


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    name: 'status',
    enum: PatientStatus,
    default: PatientStatus.ACTIVE,
  })
  status: PatientStatus;
}
