import { Entity, PrimaryColumn, PrimaryGeneratedColumn, BeforeInsert, Column } from 'typeorm';
import * as uuid from 'uuid';

@Entity('user')
export class UserEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ length: 45 })
	login: string;

	@Column({ length: 200 })
	password: string;

	@BeforeInsert()
	generateID() {
		this.id = uuid();
	}
}
