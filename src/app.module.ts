import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatorsModule } from './modules';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:Admin@hiss-db.dsr65xf.mongodb.net/hiss-db?retryWrites=true&w=majority'), CreatorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
