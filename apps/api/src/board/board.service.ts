import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { RenameBoardDTO } from './dto/rename-baord.dto';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async getTeamBoards(teamId: string, userId) {
    const teamBoardsWithFavorites = await this.prisma.board.findMany({
      where: {
        teamId: teamId,
      },
      include: {
        favorites: {
          where: {
            userId: userId,
          },
        },
      },
    });

    return teamBoardsWithFavorites.map((board) => ({
      ...board,
      isFavorite: board.favorites.length > 0,
    }));
  }

  async toggleFavorite(boardId: string, userId: string) {
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const existingFavorite = await this.prisma.favoriteBoard.findMany({
      where: { userId, boardId },
      take: 1,
    });

    if (existingFavorite[0]) {
      await this.prisma.favoriteBoard.deleteMany({
        where: {
          userId,
          boardId,
        },
      });
      return {
        message: 'Board unfavorited successfully',
        isFavorite: false,
      };
    } else {
      await this.prisma.favoriteBoard.create({
        data: {
          userId,
          boardId,
        },
      });
      return {
        message: 'Board favorited successfully',
        isFavorite: true,
      };
    }
  }

  async createBoard(board: CreateBoardDTO, authorId: string, teamId: string) {
    return await this.prisma.board.create({
      data: { ...board, authorId, teamId },
    });
  }

  async renameBoard(id: string, title: string) {
    return await this.prisma.board.update({ where: { id }, data: { title } });
  }

  async deleteBoard(id: string) {
    return await this.prisma.board.delete({ where: { id } });
  }

  async getBoard(id: string) {
    return await this.prisma.board.findUnique({ where: { id } });
  }
}
