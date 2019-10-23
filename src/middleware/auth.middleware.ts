import { NestMiddleware, Injectable } from "@nestjs/common";
import { Response, Request } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

	use(req: Request, res: Response, next: Function): void {

		if (req.headers.authorization) {

			next();
		} else {

			res.sendStatus(401);
			res.redirect('/auth');
		}
	}

	// private _checkAuth(req: Request, res: Response, next: Function) {

	// 	if (req.headers.authorization) {

	// 		next();
	// 	} else {

	// 		res.sendStatus(401);
	// 		res.redirect('/auth');
	// 	}
	// }
}