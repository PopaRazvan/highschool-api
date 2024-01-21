import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsService } from 'src/students/students.service';
import { SubjectsService } from 'src/subjects/subjects.service';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
    private readonly studentService: StudentsService,
    private readonly subjectService: SubjectsService,
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    const { value, idStudent, idSubject } = createGradeDto;

    const student = await this.studentService.findOne(idStudent);
    const subject = await this.subjectService.findOne(idSubject);

    const newGrade = this.gradeRepository.create({
      value,
      student,
      subject,
    });
    return this.gradeRepository.save(newGrade);
  }

  findAll() {
    return this.gradeRepository.find({
      relations: ['student', 'subject'],
    });
  }

  findOne(id: number) {
    return this.gradeRepository.findOne({
      where: { id },
      relations: ['student', 'subject'],
    });
  }

  update(id: number, updateGradeDto: UpdateGradeDto) {
    return this.gradeRepository.update({ id }, { ...updateGradeDto });
  }

  remove(id: number) {
    return this.gradeRepository.delete({ id });
  }
}
