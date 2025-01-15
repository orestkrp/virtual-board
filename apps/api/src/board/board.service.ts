import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoardDTO } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async getTeamBoards(teamId: string) {
    return await this.prisma.board.findMany({ where: { teamId } });
  }

  async createBoard(board: CreateBoardDTO, authorId: string, teamId: string) {
    return await this.prisma.board.create({
      data: { ...board, authorId, teamId },
    });
  }

  async getBoard(id: string) {
    return await this.prisma.board.findUnique({ where: { id } });
  }
}
