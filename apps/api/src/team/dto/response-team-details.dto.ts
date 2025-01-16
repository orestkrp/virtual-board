import { User } from '@prisma/client';
import { IsString } from 'class-validator';

export class ResponseTeamDetailsDTO {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  createdAt: string;
  @IsString()
  updatedAt: string;
  members: Omit<User, 'hashedRefreshToken' | 'password'>;
}
