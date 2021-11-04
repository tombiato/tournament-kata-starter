import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PingController } from './controllers/ping/ping.controller';
import { TournamentsModule } from './modules/tournaments.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), TournamentsModule],
  controllers: [PingController],
})
export class AppModule {}
