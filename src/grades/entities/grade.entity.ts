import { Student } from 'src/students/entities/student.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'grades' })
export class Grade {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'value' })
  value: number;

  @Column({
    name: 'notation_date',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  notationDate: Date;

  @ManyToOne(() => Student, (student) => student.grades, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_student', referencedColumnName: 'id' })
  student: Student;

  @ManyToOne(() => Subject, (subject) => subject.grades, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_subject', referencedColumnName: 'id' })
  subject: Subject;
}
