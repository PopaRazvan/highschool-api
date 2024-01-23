import { IsNumber } from 'class-validator';

export class CreateStudentDto {
  name: string;

  surname: string;

  idClassroom: number;

  @IsNumber()
  scholarship: number;

  birthDate: Date;
}
