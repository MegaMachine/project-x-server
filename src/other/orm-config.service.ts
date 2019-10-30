import { Injectable } from "@nestjs/common";
import * as path from 'path';
import 'dotenv/config';

@Injectable()
export class OrmConfigService {

	getOrmConfig(): object {

		return {
			type: process.env.DB_TYPE,
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB,
			synchronize: false,
			logging: false,
			entities: [
				`${path.dirname(require.main.filename)}/**/*.entity{.ts,.js}`,
			],
		};
	}
}
