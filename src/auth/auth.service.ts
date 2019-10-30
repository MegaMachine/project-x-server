import { Injectable } from '@nestjs/common';
import { DataBaseService, IUser } from '../database/database.service';
import { AuthUserDto } from './auth-user.dto';
import { CreateUserParser } from '../database/parser/create-user.parser';
import { JwtService } from './jwt/jwt.service';
import { env } from '../../config/env';
import { IJwtPayload, IJwtHeader } from './jwt/jwt.interface';
@Injectable()
export class AuthService {

	constructor(
		private dataBaseService: DataBaseService,
		private createUserParser: CreateUserParser,
		private jwtService: JwtService,
	) { }

	async singUp(user: IUser) {
		console.log(this.createUserParser.parse(user).password.length)
		try {
			await this.dataBaseService.createUser(
				this.createUserParser.parse(user),
			);
		} catch (err) {
			console.log(err[`message`])
			// if (err[`message`].indexOf('login_UNIQUE') !== -1) {

			// 	return 'This login is busy.';
			// }
		}
	}

	async singIn(user: IUser) {
		const receivedUser: IUser = await this.dataBaseService.getUserByLogin(user.login);

		if (receivedUser) {

			const jwtHeader: IJwtHeader = {
				alg: 'sha256',
				typ: 'JWT',
			};
			const jwtPayload: IJwtPayload = {
				id: user.id,
				name: user.login,
			};

			if (this.createUserParser.verifyPassword(user.password, receivedUser.password)) {
				console.log('Password correct');
				return this.jwtService.createToken(jwtHeader, jwtPayload, env().secret);
			} else {
				console.log('Password incorrect');
				return 'This password is incorrect.';
			}

		} else {
			console.log('huinya')
		}
	}
}
