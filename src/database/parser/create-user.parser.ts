import { AuthUserDto } from '../../auth/auth-user.dto';
import { IUser } from '../database.service';
import * as uuid from 'uuid';
import * as crypto from 'crypto';

interface IUserPassword {
	salt: string;
	passwordHash: string;
}

export class CreateUserParser {

	parse(user: AuthUserDto): IUser {
		const salt = '1231231231231231';

		return {
			login: user.login,
			password: this._passwordHash(user.password, salt),
		};
	}

	private _sha512(password, salt): string {
		const hash = crypto.createHmac('sha256', salt);
		hash.update(password);
		const value = hash.digest('hex');

		return value;
	}

	verifyPassword(passwordExternal: string, passwordInternal: string): boolean {
		const passwordInternalParse: IUserPassword = JSON.parse(passwordInternal);

		const salt = passwordInternalParse.salt;
		const passwordInternalHash = passwordInternalParse.passwordHash;

		const passwordExternalHash = this._sha512(passwordExternal, salt);

		let result: boolean;

		passwordInternalHash === passwordExternalHash ? result = true : result = false;

		return result;
	}

	private _passwordHash(password: string, salt: string): string {

		return JSON.stringify({
			salt,
			passwordHash: this._sha512(password, salt),
		});
	}
}