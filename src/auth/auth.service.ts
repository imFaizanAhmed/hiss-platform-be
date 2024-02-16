import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatorsService } from 'src/modules/creators/creators.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private creatorsService: CreatorsService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const creator = await this.creatorsService.findOne(email);
    if (creator?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: creator.firstName + creator.lastName,
      email: creator.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.creatorsService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(creator: any) {
    const payload = { email: creator.username, sub: creator.firstName + creator.lastName };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
