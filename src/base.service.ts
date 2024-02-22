import { Injectable } from '@nestjs/common';
import { Model, Document, FilterQuery } from 'mongoose';

export interface CrudService<T> {
  create(createDto: Partial<T>): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: Partial<T>): Promise<T>;
  update(id: string, updateDto: Partial<T>): Promise<T>;
  // remove(id: string): Promise<T>;
}

interface WithUpdatedAt {
  updatedAt?: Date;
  createdAt?: Date;
  deletedAt?: Date;
}

@Injectable()
export class BaseService<T extends Partial<Document & WithUpdatedAt>> implements CrudService<T> {
  constructor(private readonly model: Model<T>) {}

  async create(createDto: Partial<T>): Promise<T> {
    if (createDto['updatedAt'] === undefined) {
      createDto.updatedAt = new Date();
    }
    if ('createdAt' in createDto === false) {
      createDto.createdAt = new Date()
    }
    if ('deletedAt' in createDto === false) {
      createDto.deletedAt = null;
    }
    
    const createdEntity = new this.model(createDto);
    return createdEntity.save();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findOne(body: FilterQuery<T>): Promise<T> {
    return this.model.findOne(body).exec();
  }

  async update(id: string, updateDto: Partial<T>): Promise<T> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  // async remove(id: string): Promise<T> {
  //   return this.model.findByIdAndRemove(id).exec();
  // }
}
