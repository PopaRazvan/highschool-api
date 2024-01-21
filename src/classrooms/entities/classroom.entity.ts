import { Professor } from 'src/professors/entities/professor.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'classrooms' })
export class Classroom {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'year' })
  year: number;

  @Column({ name: 'group' })
  group: string;

  @OneToOne(() => Professor,{ onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_professor', referencedColumnName: 'id' })
  masterClass?: Professor;

  @OneToMany(() => Student, (student) => student.classroom)
  students: Student[];
}
