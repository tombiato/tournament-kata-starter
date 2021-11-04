import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Participant } from '../../api-model';
import { v4 as uuidv4 } from 'uuid';
import { TournamentRepositoryService } from '../../repositories/tournament-repository.service';
import * as mongoose from 'mongoose';

@Controller('tournaments/:id/participants')
export class ParticipantController {
  constructor(private tournamentRepository: TournamentRepositoryService) {}

  @Post()
  public async createParticipant(
    @Param('id') id: string,
    @Body() participantToAdd: Participant
  ): Promise<Participant> {
    if (participantToAdd.name.length < 1) {
      throw new HttpException('Name is missing', HttpStatus.BAD_REQUEST);
    }

    if (participantToAdd.elo < 0) {
      throw new HttpException(
        "Participant can't have a negative elo",
        HttpStatus.BAD_REQUEST
      );
    }

    if (!Number.isInteger(participantToAdd.elo)) {
      throw new HttpException(
        'Participant elo must be an Integer',
        HttpStatus.BAD_REQUEST
      );
    }

    const participant = {
      id: uuidv4(),
      name: participantToAdd.name,
      elo: participantToAdd.elo,
    };

    const tournament = await this.tournamentRepository.findOne(
      new mongoose.Types.ObjectId(id)
    );

    if (!tournament) {
      throw new HttpException(
        "This tournament doesn't exist",
        HttpStatus.NOT_FOUND
      );
    }

    tournament.participants.push(participant);

    this.tournamentRepository.createTournament(tournament);

    return participant;
  }
}
