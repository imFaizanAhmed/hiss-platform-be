import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { baseSchema } from './basic.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post extends baseSchema {
  @Prop({ required: true })
  creatorId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: false })
  media: Buffer;

  @Prop({
    type: [
      {
        reaction: String,
        creatorId: Number,
      },
    ],
    required: false,
  })
  reactions: { reaction: string; creatorId: string }[];

  @Prop({
    type: [
      {
        creatorId: String,
        content: String,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date || null,
        replies: [
          {
            user_id: String,
            content: String,
            reactions: [
              {
                reaction: String,
                creatorId: Number,
              },
            ],
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
    creatorId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    replies: {
      user_id: string;
      content: string;
      reactions: { reaction: string; creatorId: string }[];
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    }[];
  }[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
