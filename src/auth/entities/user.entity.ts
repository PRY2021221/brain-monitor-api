/* eslint-disable import/no-cycle */
import { Exclude, instanceToPlain } from 'class-transformer';
import { Patient } from '../../patient/patient.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Role {
  ADMIN = 'A',
  DOCTOR = 'D',
}

export enum UserStatus {
  ACTIVE = 'A',
  INACTIVE = 'I',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username', unique: true, nullable: false })
  username: string;

  @Column({ name: 'password', nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    name: 'dni',
    type: 'varchar',
    length: 8,
    unique: true,
    nullable: true,
    default: '',
  })
  dni: string;

  @Column({
    name: 'firstname',
    type: 'varchar',
    length: 50,
    unique: false,
    nullable: false,
    default: '',
  })
  firstname: string;
  @Column({
    name: 'lastname',
    type: 'varchar',
    length: 100,
    unique: false,
    nullable: false,
    default: '',
  })
  lastname: string;
  @Column({
    name: 'tuition',
    type: 'varchar',
    length: 100,
    unique: false,
    nullable: false,
    default: '',
  })
  tuition: string;
  @Column({
    name: 'speciality',
    type: 'varchar',
    length: 100,
    unique: false,
    nullable: false,
    default: '',
  })
  speciality: string;

  @Column({
    type: 'enum',
    name: 'role',
    enum: Role,
    default: Role.DOCTOR,
  })
  role: Role;

  @OneToMany(() => Patient, (patient: Patient) => patient.doctor)
  patients: Patient[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    name: 'status',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  toJSON() {
    return instanceToPlain(this);
  }
}
