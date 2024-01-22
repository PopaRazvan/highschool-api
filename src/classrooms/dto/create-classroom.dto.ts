import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNumber, Max, Min } from 'class-validator';

export class CreateClassroomDto {
  @ApiProperty({
    example: 12,
    required: true,
  })
  @IsNumber()
  @Min(1)
  @Max(12)
  year: number;

  @ApiProperty({
    example: 'A',
    required: true,
  })
  @IsAlpha()
  group: string;

  @ApiProperty({
    example: 1,
    required: false,
  })
  idProfessor: number | null;
}
