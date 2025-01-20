import { IsEmail, IsString } from 'class-validator';

export class ChangePasswordDTO {
  @IsString()
  newPassword: string;

  @IsString()
  password: string;
}
