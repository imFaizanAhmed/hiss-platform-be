import {
  Controller,
  Body,
  Param,
  Get,
  Delete,
  Post,
  HttpCode,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { SomeThingWentWrongException } from 'src/exceptions/errors.exceptions';
import {
  CreatePostDto,
  DeletePostDto,
  GetPostDto,
  addPostCommentsDTO,
} from 'src/dto/post.dto';
import { Types } from 'mongoose';

@Controller('post')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('get-one/:id')
  async getById(@Param() params: GetPostDto) {
    // have to complete this using hashing of password
    try {
      // have to test it
      return this.postsService.getPostWithCreator(params.id);
    } catch (error) {
      throw new SomeThingWentWrongException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  async getAllPosts(@Query() query) {
    // have to complete this using hashing of password
    try {
      const { page, limit } = query;
      return this.postsService.getAllPostsWithCreator({
        page: Number(page),
        limit: Number(limit),
      });
    } catch (error) {
      throw new SomeThingWentWrongException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/create')
  @UseInterceptors(FileInterceptor('media'))
  async createPost(@UploadedFile() media, @Body() data: CreatePostDto) {
    // have to complete this using hashing of password
    try {
      let fileB64 = null;

      // checking for valid creator Id
      if (data.creatorId && !Types.ObjectId.isValid(data.creatorId)) {
        throw new Error('Invalid creatorId provided');
      }

      if (media) {
        fileB64 = this.postsService.convertToBase64(media);
      }
      return this.postsService.create({
        ...data,
        media: fileB64,
        creatorId: new Types.ObjectId(data.creatorId), // saving creator id as objectId
      });
    } catch (error) {
      throw new SomeThingWentWrongException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async deletePost(@Param() data: DeletePostDto) {
    try {
      return this.postsService.deleteOne(data.id);
    } catch (e) {
      throw new SomeThingWentWrongException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/get-post-comments/:id')
  async getPostComments(@Param() params: GetPostDto) {
    try {
      return this.postsService.getPostComments(params.id);
    } catch (e) {
      throw new SomeThingWentWrongException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/add-post-comments')
  async addPostComments(@Body() body: addPostCommentsDTO) {
    try {
      return this.postsService.addPostComments(body);
    } catch (e) {
      throw new SomeThingWentWrongException();
    }
  }
}
