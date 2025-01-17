import { IsString } from 'class-validator';

export class RenameBoardDTO {
  @IsString()
  title: string;
}
