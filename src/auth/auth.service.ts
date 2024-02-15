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
}
