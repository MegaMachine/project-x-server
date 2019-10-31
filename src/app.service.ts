import { Injectable } from '@nestjs/common';
import { JwtService } from './auth/jwt/jwt.service';
import { env } from '../config/env';
import { IJwtHeader, IJwtPayload } from './auth/jwt/jwt.interface';

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
		private readonly jwtService: JwtService,
	) {}

	createToken(): {token: string} {

		return this.jwtService.createToken(this.header, this.payload, this.secretKey);
	}

	isTokenValid(authParam: string): boolean {
		// const sliceIndex = authParam.lastIndexOf(this.bearer) !== -1
		// 	? authParam.lastIndexOf(this.bearer) + authParam.length
		// 	: 0;
		const token = authParam.split(' ');
		console.log(token);
		return this.jwtService.isTokenValid(token[1], this.secretKey);
	}
}
