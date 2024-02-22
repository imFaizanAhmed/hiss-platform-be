import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { baseSchema } from './basic.schema';

export type CreatorDocument = HydratedDocument<Creator>;

export enum AuthEnum {
  Email = 'email',
  Google = 'google',
  Linkedin = 'linkedin'
}

function isKeyOfEnum(value: string): value is AuthEnum {
  return Object.values(AuthEnum).includes(value as any);
}

export function isValueInEnum(value: string): boolean {
  return isKeyOfEnum(value);
}

@Schema()
export class Creator extends baseSchema {

  @Prop({ required: true})
  firstName: string;
  
  @Prop({ required: false})
  middleName: string;

  @Prop({ required: true})
  lastName: string;

  @Prop({ required: true})
  title: string;

  @Prop({required: false})
  password: string;

  @Prop({required: true})
  email: string;

  @Prop({required: false})
  phoneNumbe: string;

  @Prop({required: false})
  picture: string;

  @Prop({required: false})
  authAccessToken: string;

  @Prop({ required: true, enum: AuthEnum, default: AuthEnum.Email })
  authType: AuthEnum;
}

export const CreatorSchema = SchemaFactory.createForClass(Creator);