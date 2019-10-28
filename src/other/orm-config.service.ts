import { Injectable } from "@nestjs/common";
import * as path from 'path';

@Injectable()
export class OrmConfigService {

	getOrmConfig(): object {
		console.log(`${path.dirname(require.main.filename)}/**/**.entity{.ts, .js}`);

		return {
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'db_admin',
			password: '!Qazxswedc',
			database: 'db_x',
			synchronize: false,
			logging: false,
			entities: [
				`${path.dirname(require.main.filename)}/**/*.entity{.ts,.js}`,
			],
		};
	}
}
