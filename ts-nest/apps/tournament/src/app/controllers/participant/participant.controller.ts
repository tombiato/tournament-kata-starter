import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Tournament, TournamentToAdd, Participant } from '../../api-model';
import { v4 as uuidv4 } from 'uuid';
import { TournamentRepositoryService } from '../../repositories/tournament-repository.service';

@Controller('tournaments/:id/participants')
export class ParticipantController {
  constructor(private tournamentRepository: TournamentRepositoryService) {}

  @Get()
  public getAllParticipants(@Param('id') id: string): Participant[] {
    try {
      return this.tournamentRepository.getParticipants(id);
    } catch (error) {
      throw new HttpException('No list found', HttpStatus.NOT_FOUND);
    }
  }
}
