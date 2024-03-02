import { Injectable } from '@nestjs/common';
import { CreatorsService } from 'src/modules/creators/creators.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEnum, Creator, isValueInEnum } from '../schemas/creators.schema';
import { AlreadyHaveAccountException, LoginTypeInvalidException } from 'src/exceptions/errors.exceptions';

@Injectable()
export class AuthService {
  constructor(
    private creatorsService: CreatorsService,
    private jwtService: JwtService,
  ) {}

  // !deprecated
  // this service was created to handle JWT token but now I am using passport
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const creator = await this.creatorsService.findOne({ email });
    if (creator?.password !== pass) {
    }
    const payload = {
      sub: creator.firstName + creator.lastName,
      email: creator.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.creatorsService.findOne({ email });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(creator: Creator): Promise<any> {
    if (!isValueInEnum(creator.authType)) {
      throw new LoginTypeInvalidException();
    }
    const existedCreator = await this.creatorsService.findOne({ email: creator.email });
    if (!existedCreator) {
      // Creator does not exist then create 
      return this.creatorsService.create(creator);
    }
    if (existedCreator.authType !== AuthEnum.Email) {
      // Creator exists and login with 'google' or 'linkedin'
      return existedCreator;
    }
    else {
      // Creator exists and login with 'email'
      throw new AlreadyHaveAccountException();
    }
  }

  async getJwtToken(creator: { [P in keyof Creator]: string }) {
    const payload = {
      email: creator.email,
      sub: creator.firstName + creator.lastName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getProfile({ email }: { email: string }) {
    return this.creatorsService.findOne({ email });
  }
}
