import { NestMiddleware, Injectable } from "@nestjs/common";
import { Response, Request } from "express";
import { env } from '../../config/env';
import { JwtService } from "../auth/jwt/jwt.service";
import { UserService } from "../user/user.service";
import { IRequest } from "src/user/user.controller";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

	constructor(
		private jwtService: JwtService,
		private userService: UserService,
	) {}

	async use(req: IRequest, res: Response, next: Function): void {

		if (req.headers.authorization) {

			const payload = this.jwtService.getTokenPayload(req.headers.authorization, env().secret);
			console.log()
			req.user = await this.userService.getUserInfo(payload.id);
			next();
		} else {

			// res.redirect('http://localhost:3000/auth/sign-in');
			res.sendStatus(401);
		}
	}
}