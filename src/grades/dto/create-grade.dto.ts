import { IsNumber, Max, Min } from 'class-validator';

export class CreateGradeDto {
  @IsNumber()
  @Min(1)
  @Max(10)
  value: number;

  idStudent: number;
  
  idSubject: number;
}
