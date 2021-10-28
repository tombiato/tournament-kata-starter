import { Injectable } from '@nestjs/common';
import { Tournament } from '../api-model';
import { Participant } from '../api-model';

@Injectable()
export class TournamentRepositoryService {
  private tournaments = new Map<string, Tournament>();

  public saveTournament(tournament: Tournament): void {
    this.tournaments.set(tournament.id, tournament);
  }

  public getTournament(tournamentId: string): Tournament {
    return this.tournaments.get(tournamentId);
  }

  public getParticipants(tournamentId: string): Participant[] {
    const participantsList = this.getTournament(tournamentId).participants;
    return participantsList;
  }
}
