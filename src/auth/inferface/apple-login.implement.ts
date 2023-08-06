import * as jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';
import { JwtService } from "@nestjs/jwt";
import { Injectable } from '@nestjs/common';
import { SocialUserDto } from '../dto/social-login.dto';
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { CustomUserCommandRepository } from 'src/users/repository/user-command.repository';
import { CustomUserQueryRepository } from 'src/users/repository/user-query.repository';

export type AppleJwtTokenPayload = {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  nonce: string;
  c_hash: string;
  email?: string;
  email_verified?: string;
  is_private_email?: string;
  auth_time: number;
  nonce_supported: boolean;
}

@Injectable()
export class AppleLoginStrategy {
  private readonly jwtService: JwtService;
  private appleUser: SocialUserDto;
  constructor(
    private readonly customUserCommandRepository: CustomUserCommandRepository,
    private readonly customUserQueryRepository: CustomUserQueryRepository,
    private readonly errorResponse: ErrorResponse
  ){}

  public async appleToLocalToken(appleIdToken: string) : Promise<any>{
    const decodedToken = jwt.decode(appleIdToken, { complete: true }) as {
      header: { kid: string; alg: jwt.Algorithm };
      payload: { sub: string };
    };
    const keyIdFromToken = decodedToken.header.kid;
    const applePublicKeyUrl = 'https://appleid.apple.com/auth/keys';
    const jwksClient = new JwksClient({ jwksUri: applePublicKeyUrl });
    const key = await jwksClient.getSigningKey(keyIdFromToken);
    const publicKey = key.getPublicKey();
    const verifiedDecodedToken: AppleJwtTokenPayload = jwt.verify(appleIdToken, publicKey, {
      algorithms: [decodedToken.header.alg]
    }) as AppleJwtTokenPayload;

    try {
      this.appleUser.email = verifiedDecodedToken.email;

      const user = await this.customUserQueryRepository.getByEmail(this.appleUser.email);

      this.appleUser.userIdx = user ? (await this.customUserQueryRepository.getByEmail(this.appleUser.email)).userIdx : (await this.customUserCommandRepository.saveUser(this.appleUser)).userIdx 

      const payload = { userIdx: this.appleUser.userIdx };
      return { token: this.jwtService.sign(payload) };
    } catch (error) {
      this.errorResponse.notAuthorization()
  }}
}

