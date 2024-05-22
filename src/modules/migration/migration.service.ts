import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/schemas/posts.schema';

@Injectable()
export class MigrationService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}
  async addNewAttribute() {
    try {
      await this.postModel.updateMany(
        {},
        { $set: { likedBy: null, 'comments.$.likedBy': [], 'comments.$.likeCount': 0 } },
      );
    } catch (error) {
      console.error('Migration failed:', error);
    }
  }
}
