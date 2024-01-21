import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from './entities/professor.entity';
import { Repository } from 'typeorm';
import { SubjectsService } from 'src/subjects/subjects.service';
import { ClassroomsService } from 'src/classrooms/classrooms.service';
import { Subject } from 'src/subjects/entities/subject.entity';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
    private readonly subjectsService: SubjectsService,
    @Inject(forwardRef(() => ClassroomsService))
    private readonly classroomsService: ClassroomsService,
  ) {}

  async create(createProfessorDto: CreateProfessorDto) {
    const { name, surname, idClassroom, idSubjects } = createProfessorDto;

    const classroom =
      idClassroom != null
        ? await this.classroomsService.findOne(idClassroom)
        : null;

    const subjects = await Promise.all(
      idSubjects.map(async (idSubject) => {
        return await this.subjectsService.findOne(idSubject);
      }),
    );

    const newProfessor = this.professorRepository.create({
      name,
      surname,
      classroom,
      subjects,
    });

    try {
      const professor = await this.professorRepository.save(newProfessor);

      subjects.forEach(async (subject) => {
        await this.subjectsService.addProfessor(subject, professor);
      });

      if (classroom != null)
        await this.classroomsService.addMasterClass(classroom, professor);

      return professor;
    } catch (error) {
      throw new HttpException(
        'Classrooms can not have more that one professors',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return this.professorRepository.find({
      relations: ['subjects', 'classroom'],
    });
  }

  findOne(id: number) {
    return this.professorRepository.findOne({
      where: { id },
      relations: ['subjects', 'classroom'],
    });
  }

  async update(id: number, updateProfessorDto: UpdateProfessorDto) {
    const { name, surname, idClassroom, idSubjects } = updateProfessorDto;
    console.log(updateProfessorDto);

    let classroom = null;
    let subjects = [];

    if (idClassroom != null) {
      classroom = await this.classroomsService.findOne(idClassroom);
    }

    if (idSubjects != null) {
      subjects = await Promise.all(
        idSubjects.map(async (idSubject) => {
          return await this.subjectsService.findOne(idSubject);
        }),
      );
    }

    console.log(subjects);

    await this.professorRepository.update({ id }, { name, surname, classroom });

    const professor = await this.findOne(id);

    if (classroom != null) {
      await this.classroomsService.addMasterClass(classroom, professor);
    }

    return professor;
  }

  remove(id: number) {
    return this.professorRepository.delete({ id });
  }

  async addSubject(professor: Professor, subject: Subject) {
    professor.subjects.push(subject);
    return this.professorRepository.save(professor);
  }
}
