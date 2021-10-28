import { TournamentToAdd, ParticipantToAdd } from '../app/api-model';
import { INestApplication } from '@nestjs/common';
import { startApp } from './test.utils';
import * as request from 'supertest';

const exampleTournament = {
  name: 'Unreal',
} as TournamentToAdd;

const participantExemple = {
  id: 1,
  name: 'john',
  elo: 2,
} as ParticipantToAdd;

describe('/tournament/participants endpoint', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await startApp();
  });

  describe('[POST] when creating a participant', () => {
    it('should have stored the phase in the tournament', async () => {
      const { body: bodyTournament } = await request(app.getHttpServer())
        .post(`/api/tournaments`)
        .send(exampleTournament)
        .expect(201);

      const { body: bodyParticipant } = await request(app.getHttpServer())
        .post(`/api/tournaments/${bodyTournament.id}/participants`)
        .send(participantExemple)
        .expect(201);
    });
  });
});
