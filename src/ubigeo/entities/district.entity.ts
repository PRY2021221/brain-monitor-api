import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('districts')
export class District extends BaseEntity {
  @PrimaryColumn('varchar', { name: 'id', length: 6, default: '000000' })
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: true,
    default: '',
  })
  name: string;

  @Column({
    name: 'department_id',
    type: 'varchar',
    length: 2,
    nullable: true,
    default: '00',
  })
  departmentId: string;

  @Column({
    name: 'province_id',
    type: 'varchar',
    length: 4,
    nullable: true,
    default: '0000',
  })
  provinceId: string;
}
