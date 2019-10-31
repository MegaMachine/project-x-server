import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDto {

	@IsNotEmpty()
	@IsString()
	@Length(4, 16)
	readonly login: string;

	@IsNotEmpty()
	@IsString()
	@Length(4, 16)
	readonly password: string;
}