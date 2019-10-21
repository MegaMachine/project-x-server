import { Module } from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
// import { AuthController } from './auth/auth.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	providers: [JwtService, AuthService],
	exports: [JwtService],
	controllers: [AuthController],
})
export class AuthModule { }
