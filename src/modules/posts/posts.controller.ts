import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { SomeThingWentWrongException } from 'src/exceptions/errors.exceptions';
import { CreatePostDto, DeletePostDto, GetPostDto, addPostCommentsDTO } from 'src/dto/post.dto';

@Controller('post')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('get-one/:id')
  async getById(@Param() params: GetPostDto) {
    // have to complete this using hashing of password
    try {
      return this.postsService.findById(params.id);
    } catch (error) {
      throw new SomeThingWentWrongException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  async getAllPosts() {
    // have to complete this using hashing of password
    try {
      return this.postsService.findAll();
    } catch (error) {
      throw new SomeThingWentWrongException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/create')
  async createPost(@Body() data: CreatePostDto) {
    // have to complete this using hashing of password
    try {
      return this.postsService.create(data);
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
