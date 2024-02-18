import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateCreatorDto } from 'src/dto/create-creators.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signUpDto: Record<string, any>) {
    // have to complete this using hashing of password
    const users = await this.authService.validateUser(
      signUpDto.email,
      signUpDto.password,
    );
    if (users) {
      const token = await this.authService.getJwtToken(users);
      return { ...token, ...users._doc };
    } else {
      throw new UnauthorizedException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() signUpDto: CreateCreatorDto) {
    const signUpData: any = signUpDto;
    const user = await this.authService.signUp(signUpData);

    if (user) {
      const token = await this.authService.getJwtToken(user);
      return { ...token, ...user._doc };
    } else {
      return {
        message: 'Invalid credenctial',
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    const user = await this.authService.getProfile(req.query);
    return { ...req.user, user };
  }
}
