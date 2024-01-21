export class CreateProfessorDto {
  name: string;
  surname: string;
  idClassroom: number | null;
  idSubjects: number[];
}
