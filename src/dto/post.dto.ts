import { IsString, IsObject } from 'class-validator';

export class CreatePostDto {
  @IsString()
  content: string;

  @IsString()
  creatorId: string;
}

export class GetPostDto {
  @IsString()
  id: string
}

export class DeletePostDto {
  @IsString()
  id: string
}