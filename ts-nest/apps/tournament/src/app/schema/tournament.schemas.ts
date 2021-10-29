import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TournamentPhase, Participant } from '../api-model';

export type TournamentDocument = Tournament & Document;

@Schema()
export class Tournament {
  @Prop()
  name: string;

  @Prop()
  phases: TournamentPhase[];

  @Prop()
  participants:  Participant[];
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
