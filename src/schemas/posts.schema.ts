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

  @Prop({ required: false })
  totalLikes: number;

  @Prop({ type: [Types.ObjectId], ref: 'Creator', required: false })
  likedBy: Types.ObjectId[];

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
        id: Number,
        creatorId: { type: Types.ObjectId, ref: 'Creator' }, // Adjusted type and ref
        totalLikes: Number,
        likedBy: [{ type: Types.ObjectId, ref: 'Creator' }],
        content: String,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date || null,
        commentId: Number || null,
      },
    ],
    required: false,
  })
  comments: {
    id: number;
    creatorId: Types.ObjectId;
    content: string;
    totalLikes: number;
    likedBy: Types.ObjectId[] | null;
    commentId?: number | null; // if not null, then it's reply of that comment.
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
