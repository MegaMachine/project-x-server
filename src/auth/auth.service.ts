import { Injectable } from '@nestjs/common';
import { DataBaseService, IUser } from '../database/database.service';
import { AuthUserDto } from './auth-user.dto';
import { CreateUserParser } from '../database/parser/create-user.parser';

@Injectable()
export class AuthService {

	constructor(
		private dataBaseService: DataBaseService,
		private createUserParser: CreateUserParser,
	) { }

	async singUp(user: AuthUserDto) {

		try {
			await this.dataBaseService.createUser(
				this.createUserParser.parse(user),
			);
		} catch (err) {

			if (err[`message`].indexOf('login_UNIQUE') !== -1) {

				return 'This login is busy.';
			}
		}
	}

	async singIn(user: AuthUserDto) {

		console.log(this.dataBaseService.getUserByLogin(user.login));
	}
}
