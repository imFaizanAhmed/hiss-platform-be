import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../../schemas/posts.schema';
import { BaseService } from 'src/base.service';

@Injectable()
export class PostsService extends BaseService<Post> {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {
    super(postModel);
  }
}
