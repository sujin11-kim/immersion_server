// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {compare} from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	){}

	async validateUser(id: string, password: string): Promise<any> {
		// const wantLoginuser = await this.usersService.findById(id);
		// if (!wantLoginuser || (wantLoginuser && !compare(password, wantLoginuser.password)))
		// 	return null;
		// return await this.usersService.findById(wantLoginuser.id);
	}

	async login(user: any) {
		const payload = { username: user.username, sub: user.id };
		return { access_token: this.jwtService.sign(payload) };
	}
}