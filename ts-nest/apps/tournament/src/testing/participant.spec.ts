import { TournamentToAdd, Participant } from '../app/api-model';
import { INestApplication } from '@nestjs/common';
import { startApp } from './test.utils';
import * as request from 'supertest';

const exampleTournament = {
  name: 'Unreal',
} as TournamentToAdd;

const participantExemple = {
  name: 'john',
  elo: 2,
} as Participant;

describe('/tournament/participants endpoint', () => {
  let app: INestApplication;

  let tournoisExemple;

  beforeEach(async () => {
    const { body: bodyTournament } = await request(app.getHttpServer())
          .post(`/api/tournaments`)
          .send(exampleTournament)
          .expect(201);
          tournoisExemple = bodyTournament;
  }); 

  beforeAll(async () => {
    app = await startApp();
  });

  describe('[POST] when creating a participant', () => {
    it('should have stored the new participant in the tournament', async () => {
      const { body: bodyParticipant } = await request(app.getHttpServer())
        .post(`/api/tournaments/${tournoisExemple.id}/participants`)
        .send(participantExemple)
        .expect(201);
    });

    it("when the tournament doesn't exist", async () => {
      const randomId = '68686';
      const result = await request(app.getHttpServer())
        .post(`/api/tournaments/${randomId}/participants`)
        .send(participantExemple)
        .expect(404);
    });

    it('when there is an error on user info', async () => {
      const userWithError = {
        name: 2334,
        elo: 'dood',
      };
      const result = await request(app.getHttpServer())
        .post(`/api/tournaments/${tournoisExemple.id}/participants`)
        .send(userWithError)
        .expect(400);
    });
  });
  describe('[GET] when getting all participants', () => {
    it('should have stored a new participant and send it', async () => {

      const { body: bodyParticipant } = await request(app.getHttpServer())
        .post(`/api/tournaments/${tournoisExemple.id}/participants`)
        .send(participantExemple)
        .expect(201);

      const { body: bodyAllParticipants } = await request(app.getHttpServer())
        .get(`/api/tournament/${tournoisExemple.id}/participants`)
        .expect(200);

      const expected = [];
      expected.push(participantExemple);
      expect(bodyAllParticipants).toEqual({ expected });
    });
  });
});
