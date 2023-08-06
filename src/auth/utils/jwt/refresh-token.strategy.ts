// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Payload } from './jwt.payloads';

// @Injectable()
// export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET,
//       passReqToCallback: true,
//     });
//   }

//   validate(req: Request, payload: Payload) {
//     const refreshToken = req.get('authorization').split('Bearer ')[1];

//     return {
//       ...payload,
//       refreshToken,
//     };
//   }
// }