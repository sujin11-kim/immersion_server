import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

interface User {
    id: string;
    name: string;
    email:string
}


@Injectable()
export class AuthService {
    constructor(
        @Inject()
    )


login(user: User) {
    const payload = { ...user };

    return jwt.sign(payload, this.config.jwtSecret, {
      expiresIn: '1d',
      audience: 'example.com',
      issuer: 'example.com',
    });
  }












}
