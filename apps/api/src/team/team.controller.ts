import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDTO } from './dto/create-team.dto';
import { AddMembersDTO } from './dto/add-members.dto';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get()
  async getUserTeams(@Req() req) {
    return await this.teamService.getUserTeams(req.user.id);
  }

  @Get(':id')
  async getTeamDetails(@Param('id') id: string) {
    return await this.teamService.getTeamDetails(id);
  }

  @Post(':id/members')
  async addMembers(@Body() members: AddMembersDTO, @Param('id') id: string) {
    return await this.teamService.addMembers(members.emails, id);
  }

  @Post()
  async createTeam(@Req() req, @Body() team: CreateTeamDTO) {
    return await this.teamService.createTeam(team, req.user.id);
  }
}
