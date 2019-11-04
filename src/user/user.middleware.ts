import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { IRequest } from './user.controller';
import { JwtService } from '../auth/jwt/jwt.service';
import { UserService } from './user.service';
import { env } from '../../config/env';

@Injectable()
export class UserMiddleware implements NestMiddleware {

	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {}

	async use(req: IRequest, res: Response, next: () => void) {

		if (req.headers.authorization) {

			const payload = this.jwtService.getTokenPayload(req.headers.authorization, env().secret);
			req.user = await this.userService.getUserInfo(payload.id);
			console.log('User Middleware',req.user)
			next();
		}

		next();
	}
}
