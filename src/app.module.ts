import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatorsModule, PostsModule } from './modules';
import { AuthModule } from './auth/auth.module';
import { MigrationModule } from './modules/migration/migration.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:Admin@hiss-db.dsr65xf.mongodb.net/hiss-db?retryWrites=true&w=majority',
    ),
    MigrationModule,
    CreatorsModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
