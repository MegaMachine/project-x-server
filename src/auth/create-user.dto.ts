import { IsUUID, IsString, Length, MinLength, MaxLength } from 'class-validator';
import { IUser } from '../database/database.service';

export class CreateUserDto implements IUser {

	@IsUUID()
	@IsString()
	@Length(36)
	id: string;

	@IsString()
	@MinLength(8)
	@MaxLength(46)
	login: string;

	@IsString()
	@MinLength(8)
	password: string;

}