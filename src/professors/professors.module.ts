import { Module, forwardRef } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from 'src/classrooms/entities/classroom.entity';
import { Professor } from './entities/professor.entity';
import { Student } from 'src/students/entities/student.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Grade } from 'src/grades/entities/grade.entity';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { ClassroomsModule } from 'src/classrooms/classrooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Classroom, Professor, Student, Grade, Subject]),
    SubjectsModule,
    forwardRef(() => ClassroomsModule),
  ],
  controllers: [ProfessorsController],
  providers: [ProfessorsService],
  exports: [ProfessorsService],
})
export class ProfessorsModule {}
