import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { RenameBoardDTO } from './dto/rename-baord.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('team/:teamId')
  async findTeamBoards(@Param('teamId') teamId: string, @Req() req) {
    return await this.boardService.getTeamBoards(teamId, req.user.id);
  }
  @Get(':id')
  async getBoard(@Param('id') id: string) {
    return await this.boardService.getBoard(id);
  }

  @Post(':id/fovorite')
  async toggleFavorite(@Param('id') baordId: string, @Req() req) {
    return this.boardService.toggleFavorite(baordId, req.user.id);
  }

  @Put(':id/name')
  async renameBoard(
    @Param('id') id: string,
    @Body() renameBoard: RenameBoardDTO,
  ) {
    return await this.boardService.renameBoard(id, renameBoard.title);
  }

  @Delete(`:id`)
  async deleteBoard(@Param('id') id: string) {
    return await this.boardService.deleteBoard(id);
  }

  @Post(':teamId')
  async createBoard(
    @Body() board: CreateBoardDTO,
    @Param('teamId') teamId: string,
    @Req() req,
  ) {
    return await this.boardService.createBoard(board, req.user.id, teamId);
  }
}
