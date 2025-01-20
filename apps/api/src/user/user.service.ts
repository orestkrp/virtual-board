import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { hash, verify } from 'argon2';
import { ChangeEmailDTO } from './dto/change-email.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from '@prisma/client';
import { ChangePasswordDTO } from './dto/change-password';
import { join, resolve } from 'path';
import * as fs from 'fs';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  private readonly uploadDir = resolve(
    __dirname,
    '..',
    '..',
    'uploads',
    'profileimages',
  );

  async create(createUserDTO: CreateUserDTO, isExternal: boolean) {
    const hashedPassword = await hash(createUserDTO.password);
    return await this.prismaService.user.create({
      data: { ...createUserDTO, password: hashedPassword, isExternal },
    });
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async findUser(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateAvatar(id: string, filename: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.avatar) {
      const filePath = join(this.uploadDir, user.avatar);

      try {
        if (!fs.existsSync(filePath)) {
          throw new NotFoundException(`File ${user.avatar} not found`);
        }

        await fs.promises.unlink(filePath);
      } catch (error) {
        console.error(`Error deleting file: ${user.avatar}`);
        throw error;
      }
    }

    return await this.prismaService.user.update({
      where: { id },
      data: { avatar: filename },
    });
  }

  async updateHashedRefreshToken(userId: string, hashedRT: string | null) {
    return await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: hashedRT,
      },
    });
  }

  async renameUser(name: string, id: string) {
    return await this.prismaService.user.update({
      where: { id },
      data: { name },
    });
  }

  async changeEmail({ email: newEmail, password }: ChangeEmailDTO, id: string) {
    const user: User = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = await verify(user.password, password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    return await this.prismaService.user.update({
      where: { id: user.id },
      data: { email: newEmail },
    });
  }

  async changePassword(
    { newPassword, password }: ChangePasswordDTO,
    id: string,
  ) {
    const user: User = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = await verify(user.password, password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    const hashedPassword = await hash(newPassword);

    return await this.prismaService.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  }

  async deleteUser(id: string) {
    return await this.prismaService.user.delete({ where: { id } });
  }

  async deleteAvatar(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const filePath = join(this.uploadDir, user.avatar);

    try {
      if (!fs.existsSync(filePath)) {
        throw new NotFoundException(`File ${user.avatar} not found`);
      }

      await fs.promises.unlink(filePath);
    } catch (error) {
      console.error(`Error deleting file: ${user.avatar}`);
      throw error;
    }

    return await this.prismaService.user.update({
      where: { id },
      data: { avatar: null },
    });
  }
}
