import { Module } from '@nestjs/common';
import { CreatorsController } from './creators.controller';
import { CreatorsService } from './creators.service';
import { DbModule } from 'src/schemas/db.module';

@Module({
  imports: [DbModule],
  controllers: [CreatorsController],
  providers: [CreatorsService],
  exports: [CreatorsService]
})
export class CreatorsModule {}