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

  async createTeam(@Body() team: CreateTeamDTO, userId: string) {
    return await this.prisma.team.create({
      data: { ...team, members: { connect: { id: userId } } },
    });
  }
}
