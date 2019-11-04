import { Injectable } from '@nestjs/common';
import { getConnection, getManager, getRepository, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface IUser {
	id?: string;
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

		await getConnection()
			.createQueryBuilder()
			.insert()
			.into('user')
			.values([user])
			.execute();
	}

	async getUserByLogin(login: string) {

		return await this.userRepository
			.createQueryBuilder('user')
			.select()
			.where('user.login = :value', { value: login })
			.getOne();
	}

	async getUserById(id: string) {
		console.log('getUserById', id)
		return await this.userRepository.find({
			where: {
				id,
			},
		});
	}
}
