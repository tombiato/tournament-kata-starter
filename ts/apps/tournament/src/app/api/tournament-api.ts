import { Request, Response } from 'express';
import { TournamentRepository } from '../repository/tournament-repository';

const tournamentRepository = new TournamentRepository();

export const postTournament = (req: Request, res: Response) => {
  const tournament = req.body;

  const id = tournamentRepository.saveTournament(tournament);

  res.status(201);
  res.send({ id });
};

export const getTournament = (req: Request, res: Response) => {
  const id = req.params['id'];

  const tournament = tournamentRepository.getTournament(id);

  res.status(200);
  res.send(tournament);
};
