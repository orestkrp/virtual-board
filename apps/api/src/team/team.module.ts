import { forwardRef, Module } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { UserModule } from 'src/user/user.module';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';

@Module({
  imports: [forwardRef(() => AppModule), UserModule],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
