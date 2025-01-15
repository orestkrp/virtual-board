import { IsString } from 'class-validator';

export class CreateTeamDTO {
  @IsString()
  name: string;
}
