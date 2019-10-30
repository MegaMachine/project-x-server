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

	@Get()
	getAuth(
		@Req() req: Request,
		@Res() res: Response
	) {
		const { login, password} =  req.body;
		
		res.contentType('');
		res.end('');
	}

	@Post()
	authUser(
		@Body() authUserDto: AuthUserDto,
	) {
		console.log(authUserDto);
	}

	// Develop

	@Post('/sign-up')
	async createUser(
		@Body() user: AuthUserDto,
		@Res() res: Response,
	) {
		const result = await this.authService.signUp(user);

		if (result === 'sign-in') {
			res.redirect(307, 'http://localhost:3000/auth/sign-in');
		}
	}

	@Post('/sign-in')
	async loginUser(
		@Body() user: AuthUserDto,
	) {
		console.log('Sign in user: ', user);
		return await this.authService.signIn(user);
	}
}
