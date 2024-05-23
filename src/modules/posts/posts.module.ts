import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post, PostSchema } from '../../schemas/posts.schema';
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
