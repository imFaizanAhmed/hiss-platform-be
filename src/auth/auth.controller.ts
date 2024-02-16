import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signUp(@Body() signUpDto: Record<string, any>) {
    // have to complete this using hashing of password
    // return this.authService.validateUser(signUpDto.email, signUpDto.password);
    return this.authService.login({
      email: signUpDto.email,
      password: signUpDto.password,
    });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
