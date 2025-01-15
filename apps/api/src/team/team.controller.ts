import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDTO } from './dto/create-team.dto';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get()
  async getUserTeams(@Req() req) {
    return await this.teamService.getUserTeams(req.user.id);
  }

  @Post()
  async createTeam(@Req() req, @Body() team: CreateTeamDTO) {
    console.log(team);
    return await this.teamService.createTeam(team, req.user.id);
  }
}
