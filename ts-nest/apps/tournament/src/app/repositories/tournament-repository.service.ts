import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tournament, TournamentDocument } from '../schemas/tournament.schema';
import { CreateTournamentDto } from '../api-model';
import * as mongoose from 'mongoose';
import { DeleteResult } from 'mongodb';

@Injectable()
export class TournamentRepositoryService {
  constructor(
    @InjectModel(Tournament.name)
    private tournamentModel: Model<TournamentDocument>
  ) {}

  async createTournament(
    createTournamentDto: CreateTournamentDto
  ): Promise<Tournament> {
    const createdTournament = new this.tournamentModel(createTournamentDto);
    createdTournament.id = createdTournament._id;

    return createdTournament.save();
  }

  async findAll(): Promise<Tournament[]> {
    return this.tournamentModel.find().exec();
  }

  async findOne(tournamentId: mongoose.Types.ObjectId): Promise<Tournament> {
    return this.tournamentModel.findById(tournamentId).exec();
  }

  async deleteAll(): Promise<DeleteResult> {
    return this.tournamentModel.deleteMany({});
  }
}
