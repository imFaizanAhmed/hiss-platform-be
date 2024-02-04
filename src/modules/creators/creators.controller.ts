import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { Creator } from './schemas/creators.schema';
import { CreatorsService } from './creators.service';
import { CreateCreatorDto } from '../../dto/create-creators.dto';

@Controller('creators')
export class CreatorsController {
  constructor(private creatorsService: CreatorsService) {}

  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all Creators';
  }

  @Post()
  async createUser(@Body() body: CreateCreatorDto): Promise <Creator | string> {
    console.log('body', body);
    const creator = await this.creatorsService.create(body);
    return creator;
  }
}
