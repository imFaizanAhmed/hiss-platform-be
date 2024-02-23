import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UnauthorizedException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { SomeThingWentWrongException } from 'src/exceptions/errors.exceptions';
import { ObjectId } from 'mongoose';
import { CreatePostDto, GetPostDto } from 'src/dto/post.dto';

@Controller('post')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @HttpCode(HttpStatus.OK)
  @Get("/:id")
  async getById(@Param() params: GetPostDto) {
    // have to complete this using hashing of password
    try {
      return this.postsService.findById(params.id)
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
}
