import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeamDTO } from './dto/create-team.dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async getUserTeams(id: string) {
    return await this.prisma.team.findMany({
      where: { members: { some: { id: id } } },
    });
  }

  async getTeamDetails(id: string) {
    return await this.prisma.team.findUnique({
      where: { id },
      include: {
        members: {
          omit: { password: true, hashedRefreshToken: true },
        },
      },
    });
  }

  async createTeam(team: CreateTeamDTO, userId: string) {
    return await this.prisma.team.create({
      data: {
        ...team,
        teamAdminId: userId,
        members: { connect: { id: userId } },
      },
    });
  }

  async addMembers(emails: string[], id: string) {
    const users = await this.prisma.user.findMany({
      where: { email: { in: emails } },
    });

    return await this.prisma.team.update({
      where: { id },
      data: {
        members: {
          connect: users.map((user) => ({ id: user.id })),
        },
      },
      include: {
        members: true,
      },
    });
  }
}
