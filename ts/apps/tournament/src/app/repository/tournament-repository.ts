import { Tournament } from '../api/api-model';
import { v4 as uuidv4 } from 'uuid';

export class TournamentRepository {
  private tournaments = new Map<string, Tournament>();

  public saveTournament(tournament: Tournament): string {
    if (!tournament.id) {
      tournament.id = uuidv4();
    }

    this.tournaments.set(tournament.id, tournament);

    return tournament.id;
  }

  public getTournament(tournamentId: string): Tournament {
    return this.tournaments.get(tournamentId);
  }
}
