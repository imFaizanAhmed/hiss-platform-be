import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Creator } from '../../schemas/creators.schema';
import { BaseService } from 'src/base.service';

@Injectable()
export class CreatorsService extends BaseService<Creator> {
  constructor(
    @InjectModel(Creator.name) private creatorModel: Model<Creator>,
  ) {
    super(creatorModel);
  }
}
