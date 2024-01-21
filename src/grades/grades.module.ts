import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { Classroom } from 'src/classrooms/entities/classroom.entity';
import { Professor } from 'src/professors/entities/professor.entity';
import { Student } from 'src/students/entities/student.entity';
import { Grade } from './entities/grade.entity';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Classroom, Professor, Student, Grade, Subject]),
    SubjectsModule,
    StudentsModule,
  ],
  controllers: [GradesController],
  providers: [GradesService],
  exports: [GradesService],
})
export class GradesModule {}
