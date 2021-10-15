import { app } from '../app';
import * as request from 'supertest';
import { Tournament, TournamentPhaseType } from '../app/api/api-model';

const exampleTournament = {
  name: 'Unreal',
  participants: [
    { name: 'Alice', elo: 10 },
    { name: 'Bob', elo: 20 },
  ],
  phases: [{ type: TournamentPhaseType.SingleBracketElimination }],
} as Tournament;

describe('/tournament endpoint', () => {
  describe('[POST] when creating a tournament', () => {
    it('should return the correct id', async () => {
      const { body } = await request(app)
        .post('/api/tournament')
        .send(exampleTournament)
        .expect(201);

      expect(body.id).not.toBeUndefined();
    });

    it('should have stored the tournament', async () => {
      const { body } = await request(app)
        .post('/api/tournament')
        .send(exampleTournament)
        .expect(201);

      const get = await request(app)
        .get(`/api/tournament/${body.id}`)
        .expect(200);

      expect(get.body.name).toEqual(exampleTournament.name);
    });
  });
});
