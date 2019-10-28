import { Module } from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
// import { AuthController } from './auth/auth.controller';
import { AuthController } from './auth.controller';
import { DataBaseModule } from '../database/database.module';
import { AuthService } from './auth.service';
import { CreateUserParser } from '../database/parser/create-user.parser';
// import { AuthService } from './auth.service';

@Module({
	imports: [DataBaseModule],
	providers: [JwtService, AuthService, CreateUserParser],
	exports: [JwtService],
	controllers: [AuthController],
})
export class AuthModule { }
