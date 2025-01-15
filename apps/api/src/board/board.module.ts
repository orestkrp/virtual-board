import { forwardRef, Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { AppModule } from 'src/app.module';
import { BoardController } from './board.controller';

@Module({
  imports: [forwardRef(() => AppModule)],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
