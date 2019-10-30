import { NestMiddleware, Injectable } from "@nestjs/common";
import { Response, Request } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

	use(req: Request, res: Response, next: Function): void {

		if (req.headers.authorization) {

			next();
		} else {

			// res.redirect('http://localhost:3000/auth/sign-in');
			res.sendStatus(401);
		}
	}
}