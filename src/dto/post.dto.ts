import { IsNumber, IsString } from 'class-validator';

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

export class likeUnlikeCommentsDTO {
  @IsString()
  creatorId: string;

  @IsNumber()
  commentId: number;

  @IsNumber()
  likeCount: number;

  @IsString()
  postId: string
}

export class DeletePostDto {
  @IsString()
  id: string;
}