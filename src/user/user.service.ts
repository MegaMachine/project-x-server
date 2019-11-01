import {
	Injectable,
} from '@nestjs/common';
import {
	DataBaseService,
	IUser,
} from '../database/database.service';
import {
	CreateUserParser,
} from '../database/parser/create-user.parser';
import {
	JwtService,
} from '../auth/jwt/jwt.service';
import {
	env,
} from '../../config/env';
import {
	IJwtPayload,
	IJwtHeader,
} from '../auth/jwt/jwt.interface';
import {
	IResponseBody,
} from 'src/interface/responce.interface';

@Injectable()
export class UserService {

	constructor(
		private dataBaseService: DataBaseService,
		private createUserParser: CreateUserParser,
		private jwtService: JwtService,
	) {}

	async signUp(user: IUser): Promise < IResponseBody > {

		try {
			await this.dataBaseService.createUser(
				this.createUserParser.parse(user),
			);

			return {
				status: true,
				data: null,
				message: 'user was created',
			};
		} catch (err) {

			if (err[`message`].indexOf('login_UNIQUE') !== -1) {
				console.log(err[`message`]);

				return {
					status: false,
					data: null,
					message: 'this login exists'
				};
			}

			if (err[`message`].indexOf('DATA_TOO_LONG') !== -1) {
				console.log(err[`message`] + `. Length is: ${this.createUserParser.parse(user).password.length}`);

				return {
					status: false,
					data: null,
					message: 'long password',
				};
			}
		}
	}

	async signIn(user: IUser): Promise < IResponseBody > {
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

				return {
					status: true,
					data: this.jwtService.createToken(jwtHeader, jwtPayload, env().secret),
					message: 'user was Login.',
				};
			} else {
				console.log('Password incorrect');

				return {
					status: false,
					data: null,
					message: 'password or login incorrect',
				};
			}

		} else {
			return {
				status: false,
				data: null,
				message: 'user not found',
			};
		}
	}

	async getUserInfo(id: string) {

		return await this.dataBaseService.getUserById(id);
	}
}