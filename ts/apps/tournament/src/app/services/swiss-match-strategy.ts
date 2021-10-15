import { Match, Participant, Round } from '../api/api-model';

export class SwissMatchStrategy {
  public getRounds(participants: Participant[]): Round[] {
    if (participants.length < 2) {
      return [];
    }

    if (participants.length % 2 === 1) {
      participants = [...participants, { name: '--FAKE--', elo: 0 }];
    }

    const rounds = [];
    for (let roundNb = 0; roundNb < participants.length - 1; ++roundNb) {
      const matches: Match[] = [];
      for (let part = 0; part < participants.length / 2; ++part) {
        matches.push({ participant1: participants[part], participant2: participants[participants.length / 2 + part] });
      }
      rounds.push({
        name: `Round ${roundNb + 1}`,
        matches: matches.filter((m) => m.participant1.name !== '--FAKE--' && m.participant2.name !== '--FAKE--'),
      });

      participants = [
        participants[0],
        participants[participants.length / 2],
        ...participants.slice(1, participants.length / 2 - 1),
        ...participants.slice(participants.length / 2 + 1, participants.length),
        participants[participants.length / 2 - 1],
      ];
    }

    return rounds;
  }
}
