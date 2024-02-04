import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Creator } from '../../schemas/creators.schema';
import { CreateCreatorDto } from '../../dto/create-creators.dto';

@Injectable()
export class CreatorsService {
  constructor(@InjectModel(Creator.name) private creatorModel: Model<Creator>) {}

  async create(createCreatorDto: CreateCreatorDto): Promise<Creator> {
    const createdCreator = new this.creatorModel(createCreatorDto);
    return createdCreator.save();
  }

  async findAll(): Promise<Creator[]> {
    return this.creatorModel.find().exec();
  }
}