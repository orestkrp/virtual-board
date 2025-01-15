import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDTO } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get(':teamId')
  async findAllAboards(@Param('teamId') teamId: string) {
    return this.boardService.getTeamBoards(teamId);
  }

  @Get(':id')
  async getBoard(@Param('id') id: string) {
    return this.boardService.getBoard(id);
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
