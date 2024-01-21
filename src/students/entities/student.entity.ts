import { Classroom } from 'src/classrooms/entities/classroom.entity';
import { Grade } from 'src/grades/entities/grade.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn({ name: 'id_student' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'surname' })
  surname: string;

  @Column({ name: 'scholarship' })
  scholarship: number;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @ManyToOne(() => Classroom, (classroom) => classroom.students, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_classroom', referencedColumnName: 'id' })
  classroom: Classroom;

  @OneToMany(() => Grade, (grades) => grades.student)
  grades: Grade[];
}
