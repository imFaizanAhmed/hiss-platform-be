import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatorsController } from './creators.controller';
import { CreatorsService } from './creators.service';
import { Creator, CreatorSchema } from './schemas/creators.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Creator.name, schema: CreatorSchema }])],
  controllers: [CreatorsController],
  providers: [CreatorsService],
  exports: [CreatorsService]
})
export class CreatorsModule {}