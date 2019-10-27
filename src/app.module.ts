import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import * as dotenv from 'dotenv';
import { DBConfigService } from './database/db-config';
import { UserEntity } from './database/entity/user.entity';

dotenv.config();

@Module({
	imports: [
		AuthModule,
		TypeOrmModule.forRoot({
			entities: [
				UserEntity,
			]
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.forRoutes(AppController);
	}

}
