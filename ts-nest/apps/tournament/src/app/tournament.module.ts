import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { PingController } from './controllers/ping/ping.controller';
import { TournamentController } from './controllers/tournament/tournament.controller';
import { TournamentRepositoryService } from './repositories/tournament-repository.service';

import {TournamentSchema} from './schema/tournament.schemas'

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Tournament', schema: TournamentSchema}])
  ],
  controllers: [TournamentController],
  providers: [TournamentRepositoryService],
})
export class TournamentModule {}
