import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Classroom } from './entities/classroom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsService } from 'src/students/students.service';
import { ProfessorsService } from 'src/professors/professors.service';
import { Professor } from 'src/professors/entities/professor.entity';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
    private readonly profesorService: ProfessorsService,
    @Inject(forwardRef(() => StudentsService))
    private readonly studentsService: StudentsService,
  ) {}

  async create(createClassroomDto: CreateClassroomDto) {
    const { year, group, idProfessor } = createClassroomDto;

    const professor =
      idProfessor != null
        ? await this.profesorService.findOne(idProfessor)
        : null;

    const newClassroom = this.classroomRepository.create({
      year,
      group,
      masterClass: professor,
    });
    return this.classroomRepository.save(newClassroom);
  }

  findAll() {
    return this.classroomRepository.find({
      relations: ['masterClass', 'students', 'students.grades.subject'],
    });
  }

  findOne(id: number) {
    return this.classroomRepository.findOne({
      where: { id },
      relations: ['masterClass', 'students', 'students.grades.subject'],
    });
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return this.classroomRepository.update({ id }, { ...updateClassroomDto });
  }

  remove(id: number) {
    return this.classroomRepository.delete({ id });
  }

  async addMasterClass(classroom: Classroom, professor: Professor) {
    classroom.masterClass = professor;
    return this.classroomRepository.save(classroom);
  }

  async getStudents(id: number) {
    const classroom = await this.findOne(id);
    return classroom.students;
  }
}
