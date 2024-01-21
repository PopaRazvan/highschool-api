import { Module, forwardRef } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { Classroom } from 'src/classrooms/entities/classroom.entity';
import { Grade } from 'src/grades/entities/grade.entity';
import { Professor } from 'src/professors/entities/professor.entity';
import { Student } from './entities/student.entity';
import { ClassroomsModule } from 'src/classrooms/classrooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Classroom, Professor, Student, Grade, Subject]),
    forwardRef(() => ClassroomsModule),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
