import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../../schemas/posts.schema';
import { BaseService } from 'src/base.service';
import { CreatorsService } from '../creators/creators.service';
import {
  NotPlacedException,
  SomeThingWentWrongException,
} from 'src/exceptions/errors.exceptions';
import {
  getAllPostsAggr,
  getPostAggr
} from 'src/aggregations/post.agg';

@Injectable()
export class PostsService extends BaseService<Post> {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private creatorsService: CreatorsService,
  ) {
    super(postModel);
  }

  getPostComments(id: string) {
    return this.postModel.findById(id, { comments: true });
  }

  async getPostWithCreator(id: string) {
    const post = await this.postModel
      .aggregate(getPostAggr(new this.postModel.base.Types.ObjectId(id)))
      .exec();
    return post[0] || null;
  }

  async getAllPostsWithCreator({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) {
    const post = await this.postModel
      .aggregate(getAllPostsAggr({ page, limit }))
      .exec();
    return post[0] || null;
  }

  convertToBase64(file: Express.Multer.File): string {
    //Convert the file to base64 string
    const fileB64 = file.buffer.toString('base64');
    return `data:${file.mimetype};base64, ${fileB64}`;
  }

  async addPostComments({
    postId,
    content,
    creatorId,
  }: {
    postId: string;
    content: string;
    creatorId: string;
  }) {
    try {
      const post = await this.postModel.findById(postId);
      if (!post) {
        throw new NotPlacedException('Post not found');
      }

      const creator = await this.creatorsService.findById(creatorId);
      if (!creator) {
        //? in this case "something went wrong is sent"
        throw new NotPlacedException('creator not found');
      }

      const newComment = {
        id: post.comments.length,
        content: content,
        creatorId: creator.id,
        totalLikes: 0,
        likedBy: null,
        replies: null,
        // reactions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      post.comments.push(newComment);
      await post.save();
      return newComment;
    } catch (e) {
      throw new SomeThingWentWrongException();
    }
  }

  async likeUnlikeComments({
    commentId,
    likeCount,
    postId,
    creatorId
  }: {
    commentId: number;
    likeCount: number;
    postId: string;
    creatorId: string;
  }) {
    const post = await this.postModel
    .updateOne(
      { 
        _id: new this.postModel.base.Types.ObjectId(postId),
        "comments.id": commentId
      },
      { 
        $set: { "comments.$.totalLikes": likeCount, "comments.$.likedBy": creatorId } 
      }
    );
    return post;
  }
}
