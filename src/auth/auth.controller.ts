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

	@Post('/sing-up')
	async createUser(
		@Body() user: AuthUserDto,
	) {
		await this.authService.singUp(user);
	}

	@Post('/sing-in')
	async loginUser(
		@Body() user: AuthUserDto,
	) {
		return await this.authService.singIn(user);
	}
}
