import { Module } from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
// import { UserController } from './auth/auth.controller';
import { UserController } from '../user/user.controller';
import { DataBaseModule } from '../database/database.module';
import { UserService } from '../user/user.service';
import { CreateUserParser } from '../database/parser/create-user.parser';
// import { UserService } from './auth.service';

@Module({
	imports: [],
	providers: [JwtService],
	exports: [JwtService],
	controllers: [],
})
export class AuthModule { }
