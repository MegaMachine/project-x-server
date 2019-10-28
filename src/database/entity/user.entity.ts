import { Entity, PrimaryColumn } from 'typeorm';
import { IsUUID, Length, IsString } from 'class-validator';

@Entity('user')
export class UserEntity {

	// @IsUUID()
	@IsString()
	@PrimaryColumn()
	id: string;

	@Length(45)
	@IsString()
	name: string;

	@Length(200)
	@IsString()
	password: string;
}
