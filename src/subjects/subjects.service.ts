import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from 'src/professors/entities/professor.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const newSubject = this.subjectRepository.create({ ...createSubjectDto });
    return this.subjectRepository.save(newSubject);
  }

  findAll() {
    return this.subjectRepository.find({ relations: ['professors'] });
  }

  findOne(id: number) {
    return this.subjectRepository.findOne({
      where: { id },
      relations: ['professors'],
    });
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return this.subjectRepository.update({ id }, { ...updateSubjectDto });
  }

  remove(id: number) {
    return this.subjectRepository.delete({ id });
  }

  async addProfessor(subject: Subject, professor: Professor) {
    subject.professors.push(professor);
    return this.subjectRepository.save(subject);
  }
}
