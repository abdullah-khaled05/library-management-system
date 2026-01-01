import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  student_id: string;

  @IsString()
  @IsNotEmpty()
  batch: string;
}