import { Injectable } from '@nestjs/common';
import { JwtService } from './auth/jwt/jwt.service';
import { env } from '../config/env';
import { IJwtHeader, IJwtPayload } from './auth/jwt/jwt.interface';

@Injectable()
export class AppService {

	constructor(
		private readonly jwtService: JwtService,
	) {}

}
