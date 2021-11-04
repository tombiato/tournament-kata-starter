import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { TournamentToAdd } from '../../api-model';
import { TournamentRepositoryService } from '../../repositories/tournament-repository.service';
import { Tournament } from '../../schemas/tournament.schema';
import * as mongoose from 'mongoose';

@Controller('tournaments')
export class TournamentController {
  constructor(private tournamentRepository: TournamentRepositoryService) {}

  @Post()
  public async createTournament(
    @Body() tournamentToAdd: TournamentToAdd
  ): Promise<{ id: string }> {
    if (tournamentToAdd.name.length < 1) {
      throw new HttpException('Name is missing', HttpStatus.BAD_REQUEST);
    }

    const tournament = {
      name: tournamentToAdd.name,
      phases: [],
      participants: [],
    };

    const res = await this.tournamentRepository.createTournament(tournament);

    return { id: res.id };
  }

  @Get(':id')
  public async getTournament(@Param('id') id: string): Promise<Tournament> {
    const tournamentId = await this.tournamentRepository.findOne(
      new mongoose.Types.ObjectId(id)
    );

    if (tournamentId) {
      return tournamentId;
    }

    throw new HttpException(
      "This tournament doesn't exist",
      HttpStatus.NOT_FOUND
    );
  }

  @Delete()
  public async removeAllTournaments(): Promise<void> {
    const { deletedCount } = await this.tournamentRepository.deleteAll();
    console.info(deletedCount, 'élément.s supprimé.s');
  }
}
