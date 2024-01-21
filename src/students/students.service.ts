import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { ClassroomsService } from 'src/classrooms/classrooms.service';
import { Classroom } from 'src/classrooms/entities/classroom.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @Inject(forwardRef(() => ClassroomsService))
    private readonly classroomsService: ClassroomsService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { name, surname, idClassroom, scholarship, birthDate } =
      createStudentDto;

    const classroom = await this.classroomsService.findOne(idClassroom);

    const newStudent = this.studentRepository.create({
      name,
      surname,
      classroom,
      scholarship,
      birthDate,
    });
    return await this.studentRepository.save(newStudent);
  }

  findAll() {
    return this.studentRepository.find({
      relations: ['classroom', 'grades', 'grades.subject'],
    });
  }

  findOne(id: number) {
    return this.studentRepository.findOne({
      where: { id },
      relations: ['classroom', 'grades', 'grades.subject'],
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const { name, surname, idClassroom, scholarship, birthDate } =
      updateStudentDto;
    const classroom = await this.classroomsService.findOne(idClassroom);

    return this.studentRepository.update(
      { id },
      { name, surname, classroom, scholarship, birthDate },
    );
  }

  remove(id: number) {
    return this.studentRepository.delete({ id });
  }

  async changeClassroom(student: Student, classroom: Classroom) {
    student.classroom = classroom;
    return this.studentRepository.save(student);
  }
}
