import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Tournament, TournamentToAdd, Participant, ParticipantToAdd } from '../../api-model';
import { v4 as uuidv4 } from 'uuid';
import { TournamentRepositoryService } from '../../repositories/tournament-repository.service';

@Controller('tournaments')
export class TournamentController {
  constructor(private tournamentRepository: TournamentRepositoryService) {}

  @Get(':id')
  public getTournament(@Param('id') id: string): Tournament {
    try {
      const tournament = this.tournamentRepository.getTournament(id)
      return tournament;
    } catch (error) {
      throw new HttpException("le tournoi n'existe pas", HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  public createTournament(@Body() tournamentToAdd: TournamentToAdd): {
    id: string;
  } {
    try {
      const tournament = {
        id: uuidv4(),
        name: tournamentToAdd.name,
        phases: [],
        participants: [],
      };

      this.tournamentRepository.saveTournament(tournament);

      return { id: tournament.id };
    } catch (error) {
      throw new HttpException(
        'le champ nom est manquant ou vide',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post(':id/participants')
  public addParticipant(
    @Param('id') idTournament: string,
    @Body() participantToAdd: ParticipantToAdd
  ): string {
    if (!participantToAdd?.name || !Number.isInteger(participantToAdd?.elo))
      throw new HttpException(
        'le nom (chaine de caractères non vide) ou l\'elo (nombre entier) sont incorrects', 
        HttpStatus.BAD_REQUEST
        );

    if (!this.tournamentRepository.getTournament(idTournament))
      throw new HttpException(
        'le tournoi n\'existe pas',
        HttpStatus.NOT_FOUND
      );

    const participant: Participant = {
      id: uuidv4(),
      name: participantToAdd.name.trim(),
      elo: participantToAdd.elo,
    };

    this.tournamentRepository.saveParticipant(idTournament, participant);

    return participant.id;
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
}
