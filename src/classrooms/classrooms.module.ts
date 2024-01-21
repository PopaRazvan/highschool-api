import { Module, forwardRef } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './entities/classroom.entity';
import { Professor } from 'src/professors/entities/professor.entity';
import { ProfessorsModule } from 'src/professors/professors.module';
import { Subject } from 'rxjs';
import { Grade } from 'src/grades/entities/grade.entity';
import { Student } from 'src/students/entities/student.entity';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Classroom, Professor, Student, Grade, Subject]),
    forwardRef(() => ProfessorsModule),
    forwardRef(() => StudentsModule),
  ],
  controllers: [ClassroomsController],
  providers: [ClassroomsService],
  exports: [ClassroomsService],
})
export class ClassroomsModule {}
