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

  public saveParticipant(tournamentId: string, participant: Participant): void {
    //this.tournaments.set(tournamentId, participant);
    const tournament = this.tournaments.get(tournamentId);
    this.tournaments.set(tournamentId, {
      ...tournament, 
      participants: [...tournament.participants, participant]
    })
  }
}