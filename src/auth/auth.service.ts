import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatorsService } from 'src/modules/creators/creators.service';

@Injectable()
export class AuthService {
    constructor(private creatorsService: CreatorsService) {}

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.creatorsService.findOne(email);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
      }
}
