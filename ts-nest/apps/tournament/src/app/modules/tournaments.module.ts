import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantController } from '../controllers/tournament/participant.controller';
import { TournamentController } from '../controllers/tournament/tournament.controller';
import { TournamentRepositoryService } from '../repositories/tournament-repository.service';
import { Tournament, TournamentSchema } from '../schemas/tournament.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tournament.name, schema: TournamentSchema },
    ]),
  ],
  controllers: [TournamentController, ParticipantController],
  providers: [TournamentRepositoryService],
})
export class TournamentsModule {}
