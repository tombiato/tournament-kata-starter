import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { PingController } from './controllers/ping/ping.controller';
import { TournamentModule } from './tournament.module';

import {TournamentSchema} from './schema/tournament.schemas'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root:root@tournament.zizdx.mongodb.net/tournament?retryWrites=true&w=majority'),
    TournamentModule
  ],
  controllers: [PingController],
  providers: [],
})
export class AppModule {}
