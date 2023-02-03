import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
                      secret: 'jwt secret key',
                      signOptions: { expiresIn: 3600 },
		}),
	],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}