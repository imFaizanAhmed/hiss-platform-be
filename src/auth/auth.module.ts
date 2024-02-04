import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CreatorsModule } from 'src/modules';

@Module({
  imports: [CreatorsModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}