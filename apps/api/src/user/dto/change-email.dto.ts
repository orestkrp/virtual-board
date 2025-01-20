import { IsEmail, IsString } from 'class-validator';

export class ChangeEmailDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
