import { Module } from '@nestjs/common';
import { UserController } from '../user/user.controller';
import { DataBaseModule } from '../database/database.module';
import { UserService } from '../user/user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [DataBaseModule, AuthModule],
	providers: [UserService],
	controllers: [UserController],
	exports: [],
})
export class UserModule { }
