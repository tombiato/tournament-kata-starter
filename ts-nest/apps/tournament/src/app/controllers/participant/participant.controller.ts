import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Controller('tournaments/:id/participants')
export class ParticipantController {
  constructor(private participantRepository: ParticipantRepositoryService) {}
}
