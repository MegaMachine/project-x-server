import { Injectable } from '@nestjs/common';
import { IJwt, IJwtHeader, IJwtPayload } from './jwt.interface';
import * as crypto from 'crypto';
import { env } from '../../../config/env';

@Injectable()
export class JwtService {
	private readonly iv: string = '1234567812345678';

	createToken(header: IJwtHeader, payload: IJwtPayload, secretKey: string ): string {
		const stringifyHeader = JSON.stringify(header);
		const stringifyPayload = JSON.stringify(payload);

		const unSignToken = this._createUnSingToken(stringifyHeader, stringifyPayload, header.alg);

		const jwt: IJwt = {
			header,
			payload: this._getEncrypt(stringifyPayload, secretKey),
			signature: this._getEncrypt(unSignToken, secretKey),
		};
		const stringifyJwt = JSON.stringify(jwt);
		const hexJwt = Buffer.from(stringifyJwt, 'utf8')
			.toString('hex');

		return hexJwt;
	}

	isTokenValid(externalJwt: string, secretKey: string): boolean {
		try {
			const stringifyJwt = Buffer.from(externalJwt, 'hex').toString('utf8');
			const internalJwt: IJwt = JSON.parse(stringifyJwt);
			const decryptPayload = this._getDecrypt(internalJwt.payload, secretKey);
			const stringifyHeader = JSON.stringify(internalJwt.header);

			const createdUnSignToken = this._createUnSingToken(stringifyHeader, decryptPayload, internalJwt.header.alg);
			const decryptedUnSignToken = this._getDecrypt(internalJwt.signature, secretKey);

			if (createdUnSignToken === decryptedUnSignToken) {
				return true;
			}
		} catch(err) {
			console.log(err[`message`]);
		}

		return false;
	}

	private _getHash(str: string, alg: string): string {

		return crypto
			.createHash(alg)
			.update(str)
			.digest('hex');
	}

	private _getEncrypt(str: string, secretKey: string): string {
		const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, this.iv);
		let encrypt = cipher.update(str, 'utf8', 'hex');

		return encrypt += cipher.final('hex');
	}

	private _getDecrypt(str: string, secretKey: string): string  {
		const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, this.iv);
		let decrypted = decipher.update(str, 'hex', 'utf8');

		return decrypted += decipher.final('utf8');
	}

	private _createUnSingToken(header: string, payload: string, alg: string): string {

		return this._getHash(header, alg) + '.' + this._getHash(payload, alg);
	}
}
