import { Injectable } from "@nestjs/common";

@Injectable()
export class DBConfigService {

	private static readonly DB = process.env.DB;
	private static readonly DB_HOST = process.env.DB_HOST;
	private static readonly DB_PORT = process.env.DB_PORT;
	private static readonly DB_USER = process.env.DB_USER;
	private static readonly DB_PASSWORD = process.env.DB_PASSWORD;
	private static readonly DB_TYPE = process.env.DB_TYPE;

	static get getDataBase() {

		return this.DB;
	}

	static get getDataBaseHost(): string {

		return this.DB_HOST;
	}
	static get getDataBasePort(): number {

		return parseFloat(this.DB_PORT);
	}
	static get getDataBaseUser(): string {

		return this.DB_USER;
	}
	static get getDataBasePassword(): string {

		return this.DB_PASSWORD;
	}
	static get getDataBaseType(): string {

		return this.DB_TYPE;
	}
}
