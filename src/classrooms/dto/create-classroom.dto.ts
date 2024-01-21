import { IsAlpha, IsNumber, Max, Min } from 'class-validator';

export class CreateClassroomDto {
  @IsNumber()
  @Min(1)
  @Max(12)
  year: number;

  @IsAlpha()
  group: string;

  idProfessor: number | null;
}
