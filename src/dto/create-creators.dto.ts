import { IsString, IsInt, IsEmail, IsOptional } from 'class-validator';

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
}
