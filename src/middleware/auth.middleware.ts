import { NestMiddleware, Injectable } from "@nestjs/common";
import { Response, Request } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

	use(req: Request, res: Response, next: Function): void {
		console.log('url: ', req.url);
		console.log('baseUrl: ', req.baseUrl);
		console.log('auth: ', req.headers.authorization)
		if (req.headers.authorization) {

			console.log('auth check')
			next();
		} else {

			// res.redirect('http://localhost:3000/auth/sign-in');
			res.sendStatus(401);
		}
	}
}