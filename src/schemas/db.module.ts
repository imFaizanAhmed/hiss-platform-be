import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './posts.schema';
import { Creator, CreatorSchema } from './creators.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Creator.name, schema: CreatorSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DbModule {}
