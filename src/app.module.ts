import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import * as dotenv from 'dotenv';
import { DBConfigService } from './database/db-config';

dotenv.config();

@Module({
	imports: [
		AuthModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: DBConfigService.getDataBaseHost,
			port: DBConfigService.getDataBasePort,
			username: DBConfigService.getDataBaseUser,
			password: DBConfigService.getDataBasePassword,
			database: DBConfigService.getDataBase,
			entities: [],
			synchronize: true,
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
