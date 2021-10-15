import { SwissMatchStrategy } from './swiss-match-strategy';
import { Participant, Round } from '../api/api-model';

function isMatchBetween(p1: string, p2: string) {
  return (m) =>
    (m.participant1.name === p1 && m.participant2.name === p2) ||
    (m.participant2.name === p1 && m.participant1.name === p2);
}

function checkParticipantsDontPlayMoreThanOncePerRound(participants: Participant[], result: Round[]) {
  for (const participant of participants.map((p) => p.name)) {
    for (const round of result) {
      const numberOfPlays = round.matches.filter(
        (s) => s.participant1.name === participant || s.participant2.name === participant
      );
      expect(numberOfPlays.length).toBeLessThanOrEqual(1);
    }
  }
}

function checkParticipantsPlayAllTheOthers(result: Round[], participants: Participant[]) {
  const allMatches = result.map((r) => r.matches).reduce((curr, acc) => [...curr, ...acc], []);
  const allParticipantsNames = participants.map((p) => p.name);
  for (const p1 of allParticipantsNames) {
    for (const p2 of allParticipantsNames.filter((p) => p !== p1)) {
      expect(allMatches.find(isMatchBetween(p1, p2))).toBeTruthy();
    }
  }
}

describe('Swiss match strategy', () => {
  let swissMatchStrategy: SwissMatchStrategy;

  beforeEach(() => {
    swissMatchStrategy = new SwissMatchStrategy();
  });

  describe('when there are no players', () => {
    it('should generate no round', () => {
      expect(swissMatchStrategy.getRounds([])).toEqual([]);
    });
  });

  describe('when there is only one player', () => {
    it('should generate no round', () => {
      expect(swissMatchStrategy.getRounds([{ name: 'Alice', elo: 1200 }])).toEqual([]);
    });
  });

  describe(`when there is an even number of participants`, () => {
    let result: Round[];
    const participants: Participant[] = [
      { name: 'Alice', elo: 10 },
      { name: 'Bob', elo: 10 },
      { name: 'Carol', elo: 10 },
      { name: 'Daniel', elo: 10 },
    ];
    beforeEach(() => {
      result = swissMatchStrategy.getRounds(participants);
    });

    it('should generate participants - 1 rounds, named consistently', () => {
      expect(result).toHaveLength(participants.length - 1);
      expect(result[0].name).toBe('Round 1');
      expect(result[1].name).toBe('Round 2');
      expect(result[2].name).toBe('Round 3');
    });

    it('should be made so that each participant plays no more than once per round', () => {
      checkParticipantsDontPlayMoreThanOncePerRound(participants, result);
    });

    it('should be made so that each participant plays all the others', () => {
      checkParticipantsPlayAllTheOthers(result, participants);
    });
  });

  describe(`when there is an odd number of participants`, () => {
    let result: Round[];
    const participants: Participant[] = [
      { name: 'Alice', elo: 10 },
      { name: 'Bob', elo: 10 },
      { name: 'Carol', elo: 10 },
      { name: 'Daniel', elo: 10 },
      { name: 'Emily', elo: 10 },
    ];

    beforeEach(() => {
      result = swissMatchStrategy.getRounds(participants);
    });

    it('should generate participants rounds, named consistently', () => {
      expect(result).toHaveLength(5);
      expect(result[0].name).toBe('Round 1');
      expect(result[1].name).toBe('Round 2');
      expect(result[2].name).toBe('Round 3');
      expect(result[3].name).toBe('Round 4');
      expect(result[4].name).toBe('Round 5');
    });

    it('should be made so that each participant plays no more than once per round', () => {
      checkParticipantsDontPlayMoreThanOncePerRound(participants, result);
    });

    it('should be made so that each participant plays all the others', () => {
      checkParticipantsPlayAllTheOthers(result, participants);
    });
  });
});
