import { Controller, Get, Req, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express-serve-static-core';
import { IResponseBody } from './interface/responce.interface';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
	) { }

	@Get()
	getHello(
		@Req() req: Request,
	): IResponseBody {
		const message = this.appService.isTokenValid(req.headers.authorization)
				? 'welcome'
				: 'auth pls';

		return {
			status: true,
			data: null,
			message,
		};
	}
}
