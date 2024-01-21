import { Professor } from 'src/professors/entities/professor.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'admin', default: false })
  admin: boolean;

  @OneToOne(() => Student)
  @JoinColumn({ name: 'id_student', referencedColumnName: 'id' })
  student?: Student;

  @OneToOne(() => Professor)
  @JoinColumn({ name: 'id_professor', referencedColumnName: 'id' })
  professor?: Professor;
}
