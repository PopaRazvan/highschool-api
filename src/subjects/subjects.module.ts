import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from 'src/classrooms/entities/classroom.entity';
import { Grade } from 'src/grades/entities/grade.entity';
import { Professor } from 'src/professors/entities/professor.entity';
import { Student } from 'src/students/entities/student.entity';
import { Subject } from './entities/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Classroom, Professor, Student, Grade, Subject]),
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService],
})
export class SubjectsModule {}
