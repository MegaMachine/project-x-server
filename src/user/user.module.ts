import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from '../user/user.controller';
import { DataBaseModule } from '../database/database.module';
import { UserService } from '../user/user.service';
import { AuthModule } from '../auth/auth.module';
import { UserMiddleware } from './user.middleware';

@Module({
	imports: [DataBaseModule, AuthModule],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule  //{}
implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(UserMiddleware)
			.forRoutes(UserController);
	}

}