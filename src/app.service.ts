import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { env } from '../config/env';
import { IJwtHeader, IJwtPayload } from './auth/auth.interface';

@Injectable()
export class AppService {
	private readonly header: IJwtHeader = {
		alg: 'sha256',
		typ: 'JWT',
	};

	private readonly payload: IJwtPayload = {
		id: '123',
		name: 'Tolik',
	};

	private readonly secretKey: string = env().secret;
	private readonly bearer: string = env().bearer;

	constructor(
		private readonly authService: AuthService,
	) {}

	createToken(): string {

		return this.authService.createToken(this.header, this.payload, this.secretKey);
	}

	isTokenValid(authParam: string): boolean {
		// const sliceIndex = authParam.lastIndexOf(this.bearer) !== -1
		// 	? authParam.lastIndexOf(this.bearer) + authParam.length
		// 	: 0;
		const token = authParam.split(' ');
		console.log(token);
		return this.authService.isTokenValid(token[1], this.secretKey);
	}
}
