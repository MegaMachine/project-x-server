import * as dotenv from 'dotenv';
dotenv.config();

export function env() {
	return {
		secret: process.env.SECRET,
		bearer: process.env.BEARER,
	};
}
