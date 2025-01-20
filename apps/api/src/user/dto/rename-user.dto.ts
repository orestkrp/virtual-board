import { IsString } from 'class-validator';

export class RenameUserDTO {
  @IsString()
  name: string;
}
