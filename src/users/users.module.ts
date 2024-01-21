import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { Classroom } from 'src/classrooms/entities/classroom.entity';
import { Grade } from 'src/grades/entities/grade.entity';
import { Professor } from 'src/professors/entities/professor.entity';
import { Student } from 'src/students/entities/student.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Classroom,
      Professor,
      Student,
      Grade,
      Subject,
      User,
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
