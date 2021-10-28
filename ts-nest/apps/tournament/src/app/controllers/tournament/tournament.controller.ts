import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import {
  Tournament,
  TournamentToAdd,
  Participant,
  ParticipantToAdd,
} from '../../api-model';
import { v4 as uuidv4 } from 'uuid';
import { TournamentRepositoryService } from '../../repositories/tournament-repository.service';

@Controller('tournaments')
export class TournamentController {
  constructor(private tournamentRepository: TournamentRepositoryService) {}

  @Post()
  public createTournament(@Body() tournamentToAdd: TournamentToAdd): {
    id: string;
  } {
    const tournament = {
      id: uuidv4(),
      name: tournamentToAdd.name,
      phases: [],
      participants: [],
    };
    this.tournamentRepository.saveTournament(tournament);

    return { id: tournament.id };
  }

  @Post(':id/participants')
  public addParticipant(
    @Body() participantToAdd: ParticipantToAdd,
    @Param('id') tournamentId: string
  ): Participant {
    const participant = {
      id: uuidv4(),
      name: participantToAdd.name,
      elo: participantToAdd.elo,
    };

    const tournament = this.tournamentRepository.getTournament(tournamentId);

    tournament.participants.push(participant);

    this.tournamentRepository.saveTournament(tournament);

    return participant.id;
  }

  @Get(':tournamentId/participants')
  public getAllParticipants(
    @Param('tournamentId') tournamentId: string
  ): Participant[] {
    try {
      return this.tournamentRepository.getParticipants(tournamentId);
    } catch (error) {
      throw new HttpException('No list found', HttpStatus.BAD_REQUEST);
    }
  }
  // /**
  //  * requete de création de phase
  //  */
  // @Post(':id/phase/:phaseType')
  // public addPhase(@Param('id') id: string, @Param('phaseType') phaseType: string){
  //   let tournamentToModify = this.tournamentRepository.getTournament(id);
  //   const phaseToAdd ={
  //       type : phaseType
  //   }
  //   const tournamentModified = {
  //     id: tournamentToModify.id,
  //     name: tournamentToModify.name,
  //     phases: []
  //   }
  //   tournamentToModify.phases.set;
  // }

  @Get(':id')
  public getTournament(@Param('id') id: string): Tournament {
    return this.tournamentRepository.getTournament(id);
  }
}
