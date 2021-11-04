import { TournamentToAdd, Participant } from '../app/api-model';
import { INestApplication } from '@nestjs/common';
import { startApp } from './test.utils';
import * as request from 'supertest';
import * as mongoose from 'mongoose';

const exampleTournament = {
  name: 'Unreal',
} as TournamentToAdd;

const exampleParticipant = {
  name: 'Sponge Bob',
  elo: 11,
} as Participant;

describe('/tournament endpoint', () => {
  let app: INestApplication;

  // Functions
  async function createTournament(tournament, statusCodeExpected) {
    const { body } = await request(app.getHttpServer())
      .post('/api/tournaments')
      .send(tournament)
      .expect(statusCodeExpected);

    return body;
  }

  async function addParticipantToTournament(
    tournamentId,
    participant,
    statusCodeExpected
  ) {
    const { body } = await request(app.getHttpServer())
      .post(`/api/tournaments/${tournamentId}/participants`)
      .send(participant)
      .expect(statusCodeExpected);

    return body;
  }

  async function getTournament(tournamentId, statusCodeExpected) {
    const { body } = await request(app.getHttpServer())
      .get(`/api/tournaments/${tournamentId}`)
      .expect(statusCodeExpected);

    return body;
  }

  // Tests
  beforeAll(async () => {
    app = await startApp();
  });

  afterAll(async () => {
    await request(app.getHttpServer()).delete(`/api/tournaments`);
  });

  describe('[POST] when creating a tournament', () => {
    it('should return the correct id', async () => {
      const tournament = await createTournament(exampleTournament, 201);

      expect(tournament.id).not.toBeUndefined();
    });

    it('should have stored the tournament', async () => {
      const body = await createTournament(exampleTournament, 201);
      const get = await request(app.getHttpServer())
        .get(`/api/tournaments/${body.id}`)
        .expect(200);

      expect(get.body.name).toEqual(exampleTournament.name);
    });

    it('should fail because tournament name is missing', async () => {
      const emptyTournament = {
        name: '',
      } as TournamentToAdd;

      const body = await createTournament(emptyTournament, 400);

      expect(body.message).toEqual('Name is missing');
    });
  });

  describe('[GET] when getting a tournament', () => {
    it('should fail because tournament id is missing', async () => {
      const objectId = new mongoose.Types.ObjectId();
      const randomId = objectId.toString();

      const body = await getTournament(randomId, 404);

      expect(body.message).toEqual("This tournament doesn't exist");
    });

    it('should get a tournament', async () => {
      const tournament = await createTournament(exampleTournament, 201);
      const body = await getTournament(tournament.id, 200);

      expect(body.name).toEqual('Unreal');
    });
  });

  describe('[POST] when creating a participant', () => {
    it('should fail because participant name is missing', async () => {
      const emptyParticipant = {
        name: '',
        elo: 11,
      } as Participant;

      const tournament = await createTournament(exampleTournament, 201);

      await addParticipantToTournament(tournament.id, emptyParticipant, 400);
    });

    it('should fail because participant elo is negative', async () => {
      const emptyParticipant = {
        name: 'Sponge Bob',
        elo: -5,
      } as Participant;

      const tournament = await createTournament(exampleTournament, 201);

      await addParticipantToTournament(tournament.id, emptyParticipant, 400);
    });

    it('should fail because participant elo is not an integer', async () => {
      const emptyParticipant = {
        name: 'Sponge Bob',
        elo: 5.11,
      } as Participant;

      const tournament = await createTournament(exampleTournament, 201);

      await addParticipantToTournament(tournament.id, emptyParticipant, 400);
    });

    it('should add a participant to unrealTournament', async () => {
      const tournament = await createTournament(exampleTournament, 201);
      const body = await addParticipantToTournament(
        tournament.id,
        exampleParticipant,
        201
      );

      expect(body.id).toBeTruthy();
    });

    it("should fail because the tournament doesn't exist", async () => {
      const objectId = new mongoose.Types.ObjectId();
      const tournamentId = objectId.toString();

      const body = await addParticipantToTournament(
        tournamentId,
        exampleParticipant,
        404
      );

      expect(body.id).toBeUndefined();
    });
  });
});
