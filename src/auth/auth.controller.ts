import { Controller, Get, Req, Res, Post, Param, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthUserDto } from './auth-user.dto';
import { IUser } from '../database/database.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

	constructor(
		private authService: AuthService,
	) {}

	@Post('/sign-up')
	async createUser(
		@Body() user: AuthUserDto,
	) {
		console.log('Sign up user: ', user);
		return await this.authService.signUp(user);
	}

	@Post('/sign-in')
	async loginUser(
		@Body() user: AuthUserDto,
	) {
		console.log('Sign in user: ', user);

		return await this.authService.signIn(user);
	}
}
