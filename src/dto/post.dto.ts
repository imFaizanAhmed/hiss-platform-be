import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  content: string;

  @IsString()
  creatorId: string;
}

export class GetPostDto {
  @IsString()
  id: string;
}

export class addPostCommentsDTO {
  @IsString()
  postId: string;

  @IsString()
  content: string;

  @IsString()
  creatorId: string;
}

export class DeletePostDto {
  @IsString()
  id: string;
}