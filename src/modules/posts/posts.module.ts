import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatorsModule } from '../creators/creators.module';
import { DbModule } from 'src/schemas/db.module';

@Module({
  imports: [
    DbModule,
    CreatorsModule
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
