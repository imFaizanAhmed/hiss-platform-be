import { IsString, IsInt, IsEmail, IsOptional } from 'class-validator';
import { AuthEnum } from 'src/schemas/creators.schema';

export class CreateCreatorDto {
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName: string;

  @IsString()
  lastName: string;

  @IsString()
  title: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsInt()
  phoneNumbe: number;

  @IsOptional()
  @IsString()
  password: string

  @IsOptional()
  @IsString()
  picture: string

  @IsOptional()
  @IsString()
  authAccessToken: string

  @IsString()
  authType: AuthEnum
}
