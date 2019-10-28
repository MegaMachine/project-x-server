import { Injectable } from '@nestjs/common';
import { getConnection, getManager, getRepository, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface IUser {
	id: string;
	login: string;
	password: string;
}

@Injectable()
export class DataBaseService {

	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}
	async createUser(user?: IUser) {
		// user = {
		// 	id: '00000000-0000-0000-0000',
		// 	login: 'testlogin',
		// 	password: 'testpassword',
		// };

		await getConnection()
			.createQueryBuilder()
			.insert()
			.into('user')
			.values([user])
			.execute();
	};

	async getUserByLogin(login: string) {

		return await getConnection()
			.createQueryBuilder()
			.select()
			.from('UserEntity', 'user')
			.where('user.login = :value', { value: login })
			.getOne();
	}
}