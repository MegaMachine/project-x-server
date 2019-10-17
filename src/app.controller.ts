import { Controller, Get, Req, Param } from '@nestjs/common';
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
		console.log(this.appService.createToken());
		if (req.headers.authorization) {

			const response = this.appService.isTokenValid(req.headers.authorization)
				? 'welcome'
				: 'auth pls';

			return response;
		} else {

			return this.appService.createToken();
		}
	}
}
