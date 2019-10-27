import { Entity, PrimaryColumn } from 'typeorm';
import { IsUUID, Length, IsString } from 'class-validator';

@Entity()
export class UserEntity {

	// @IsUUID()
	@IsString()
	@PrimaryColumn()
	id: string;

	@Length(45)
	@IsString()
	name: string;

	@Length(45)
	@IsString()
	password: string;
}
