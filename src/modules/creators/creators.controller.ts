import { Controller } from '@nestjs/common';
import { CreatorsService } from './creators.service';

@Controller('creators')
export class CreatorsController {
  constructor(private creatorsService: CreatorsService) {}
}
