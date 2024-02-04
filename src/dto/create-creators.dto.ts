import { IsString, IsInt, IsEmail } from 'class-validator';

export class CreateCreatorDto {
  @IsString()
  firstName: string;

  @IsString()
  middleName: string;

  @IsString()
  lastName: string;

  @IsString()
  title: string;

  @IsEmail()
  email: string;

  @IsInt()
  phoneNumbe: number;
}
