import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { baseSchema } from './basic.schema';

export type PostDocument = Document & Post;

@Schema()
export class Post extends baseSchema {
  @Prop({ type: Types.ObjectId, ref: 'Creator', required: true }) // Adjusted to 'Creator' and ObjectId
  creatorId: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ required: false })
  media: string;

  // @Prop({
  //   type: [
  //     {
  //       reaction: String,
  //       creatorId: { type: Types.ObjectId, ref: 'Creator' }, // Adjusted type and ref
  //     },
  //   ],
  //   required: false,
  // })
  // reactions: { reaction: string; creatorId: Types.ObjectId }[];

  @Prop({
    type: [
      {
        creatorId: { type: Types.ObjectId, ref: 'Creator' }, // Adjusted type and ref
        content: String,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date || null,
        replies: [
          {
            creatorId: { type: Types.ObjectId, ref: 'Creator' }, // Adjusted field name and type
            content: String,
            // reactions: [
            //   {
            //     reaction: String,
            //     creatorId: { type: Types.ObjectId, ref: 'Creator' }, // Adjusted type and ref
            //   },
            // ],
            createdAt: Date,
            updatedAt: Date,
            deletedAt: Date || null,
          },
        ],
      },
    ],
    required: false,
  })
  comments: {
    creatorId: Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    replies: {
      creatorId: Types.ObjectId;
      content: string;
      // reactions: { reaction: string; creatorId: Types.ObjectId }[];
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    }[];
  }[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
