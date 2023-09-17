import * as jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';
import { JwtService } from "@nestjs/jwt";
import { Injectable } from '@nestjs/common';
import { SocialUserDto } from '../dto/social-login.dto';
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { CustomUserCommandRepository } from 'src/users/repository/user-command.repository';
import { CustomUserQueryRepository } from 'src/users/repository/user-query.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'resource/db/entities/User';

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
    private readonly errorResponse: ErrorResponse,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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

    const queryRunner = this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction("REPEATABLE READ");
      this.appleUser.email = verifiedDecodedToken.email;

      const user = await this.customUserQueryRepository.getByEmail(this.appleUser.email, queryRunner);

      this.appleUser.userIdx = user ? (await this.customUserQueryRepository.getByEmail(this.appleUser.email, queryRunner)).userIdx : (await this.customUserCommandRepository.signUp(this.appleUser, queryRunner)).userIdx 

      const payload = { userIdx: this.appleUser.userIdx };
      return { token: this.jwtService.sign(payload) };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.errorResponse.notAuthorizationApple()
    }finally {
      await queryRunner.release();
    }
  }
}

