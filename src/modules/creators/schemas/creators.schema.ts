import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CreatorDocument = HydratedDocument<Creator>;

@Schema()
export class Creator {

  @Prop({ required: true})
  firstName: string;
  
  @Prop({ required: false})
  middleName: string;

  @Prop({ required: true})
  lastName: string;

  @Prop({ required: true})
  title: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  email: string;

  @Prop({required: false})
  phoneNumbe: string;
}

export const CreatorSchema = SchemaFactory.createForClass(Creator);