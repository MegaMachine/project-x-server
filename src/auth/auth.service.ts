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

	async singUp(user: IUser) {

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

	async singIn(user: IUser) {
		const receivedUser: IUser = await this.dataBaseService.getUserByLogin(user.login);

		if (receivedUser) {
			
			this.createUserParser.verifyPassword(user.password, receivedUser.password)
				? console.log('Password is correct')
				: console.log('Password incorrect');
		} else {
			console.log('huinya')
		}
	}
}
