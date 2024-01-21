import { Grade } from 'src/grades/entities/grade.entity';
import { Professor } from 'src/professors/entities/professor.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'subjects' })
export class Subject {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => Grade, (grades) => grades.subject)
  grades: Grade[];

  @ManyToMany(() => Professor, { nullable: true })
  @JoinTable()
  professors?: Professor[];
}
