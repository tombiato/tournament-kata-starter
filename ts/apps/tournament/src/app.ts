import * as express from 'express';
import { getTournament, postTournament } from './app/api/tournament-api';
import * as bodyParser from 'body-parser';

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to tournament!' });
});

app.post('/api/tournament', postTournament);
app.get('/api/tournament/:id', getTournament);
