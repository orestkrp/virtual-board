import { IsArray, IsString } from 'class-validator';

export class AddMembersDTO {
  @IsArray()
  emails: string[];
}
