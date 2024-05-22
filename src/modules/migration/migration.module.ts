import { Module } from '@nestjs/common';
import { DbModule } from 'src/schemas/db.module';
import { MigrationService } from './migration.service';

@Module({
  imports: [DbModule],
  providers: [MigrationService],
  exports: [MigrationService]
})
export class MigrationModule {}