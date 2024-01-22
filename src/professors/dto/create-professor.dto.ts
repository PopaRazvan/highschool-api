import { ApiProperty } from '@nestjs/swagger';

export class CreateProfessorDto {
  @ApiProperty({
    example: 'Popescu',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'Mihai',
    required: true,
  })
  surname: string;

  @ApiProperty({
    example: 3,
    required: true,
  })
  idClassroom: number | null;

  @ApiProperty({
    example: [1, 3, 4],
    required: true,
  })
  idSubjects: number[];
}
