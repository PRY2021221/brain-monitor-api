import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('provinces')
export class Province extends BaseEntity {
  @PrimaryColumn('varchar', { name: 'id', length: 4, default: '0000' })
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
}
