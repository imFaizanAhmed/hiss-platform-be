import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  content: string;

  @IsString()
  creatorId: string;
}

export class GetPostIdDto {
  @IsString()
  id: string;
}

export class GetPaginatedPostCommentsDto {
  @IsString()
  page: string;

  @IsString()
  limit: string;
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