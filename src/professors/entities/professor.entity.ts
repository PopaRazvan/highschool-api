import { Classroom } from 'src/classrooms/entities/classroom.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'professors' })
export class Professor {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'surname' })
  surname: string;

  @ManyToMany(() => Subject, { nullable: true })
  @JoinTable({
    name: 'teaching',
    joinColumn: {
      name: 'id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_subject',
      referencedColumnName: 'id',
    },
  })
  subjects?: Subject[];

  @OneToOne(() => Classroom, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_classroom', referencedColumnName: 'id' })
  classroom?: Classroom;
}
