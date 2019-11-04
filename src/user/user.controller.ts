import { Controller, Get, Req, Res, Post, Param, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { IResponseBody } from 'src/interface/responce.interface';

export interface IRequest extends Request{
	user: object;
}

@Controller('user')
export class UserController {

	constructor(
		private userService: UserService,
	) {}

	@Post('/sign-up')
	async createUser(
		@Body() user: UserDto,
	) {
		console.log('Sign up user: ', user);

		return await this.userService.signUp(user);
	}

	@Post('/sign-in')
	async loginUser(
		@Body() user: UserDto,
	) {
		console.log('Sign in user: ', user);

		return await this.userService.signIn(user);
	}

	@Get('/me')
	getUserInfo(
		@Req() req: IRequest,
	): IResponseBody {
		console.log(req.user)
		return {
			status: true,
			data: req.user,
			message: 'user info',
		};
	}
}
