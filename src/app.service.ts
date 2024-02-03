import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log("hellloooooooo");
    return 'Hello World bro!';
  }
}
