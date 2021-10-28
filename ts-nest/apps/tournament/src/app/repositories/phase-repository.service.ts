import { Injectable } from '@nestjs/common';
import { TournamentPhase, Tournament } from '../api-model';
import { TournamentRepositoryService } from './tournament-repository.service';

@Injectable()
export class TournamentPhaseRepositoryService {
  private tournamentPhases = new Map<string, TournamentPhase>();
  public addTournamentPhase(
    phase: TournamentPhase,
    tournamentId: string
  ): void {
    const tournamentRepository = new TournamentRepositoryService();
    const tournamentToModify = tournamentRepository.getTournament(tournamentId);
    tournamentToModify.phases;
  }
}
