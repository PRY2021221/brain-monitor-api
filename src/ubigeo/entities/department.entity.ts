import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('departments')
export class Department extends BaseEntity {
  @PrimaryColumn('varchar', { name: 'id', length: 2, default: '00' })
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: true,
    default: '',
  })
  name: string;
}
