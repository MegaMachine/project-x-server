import { Controller, Get, Req, Res, Post, Param, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthUserDto } from './auth.dto';

@Controller('auth')
export class AuthController {

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
}
