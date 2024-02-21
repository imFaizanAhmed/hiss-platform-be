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

  @IsString()
  password: string

  @IsOptional()
  @IsString()
  picture: string

  @IsString()
  authType: AuthEnum
}
