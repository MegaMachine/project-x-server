import { Controller, Get, Req, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express-serve-static-core';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
	) { }

	@Get()
	getHello(
		@Req() req: Request,
	): string {
		const response = this.appService.isTokenValid(req.headers.authorization)
				? 'welcome'
				: 'auth pls';

		return response;
	}
}
