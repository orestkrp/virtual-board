import { IsString } from 'class-validator';

export class RenameTeamDTO {
  @IsString()
  name: string;
}
