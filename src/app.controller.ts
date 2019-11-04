import { Controller, Get, Req, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express-serve-static-core';
import { IResponseBody } from './interface/responce.interface';
import { JwtService } from './auth/jwt/jwt.service';
import {env} from '../config/env'

@Controller()
export class AppController {
	constructor(
		private readonly jwtService: JwtService,
	) { }

	@Get()
	getHello(
		@Req() req: Request,
	): IResponseBody {
		const message = this.jwtService.isTokenValid(req.headers.authorization, env().secret)
				? 'welcome'
				: 'auth pls';

		return {
			status: true,
			data: null,
			message,
		};
	}
}
