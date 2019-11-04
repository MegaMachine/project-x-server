import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import * as dotenv from 'dotenv';
import { DBConfigService } from './database/db-config';
import { UserEntity } from './database/entity/user.entity';
import { OtherModule } from './other/other.module';
import { OrmConfigService } from './other/orm-config.service';
import { DataBaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';

dotenv.config();

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [OtherModule],
			useFactory: (ormConfigService: OrmConfigService) => {
				return ormConfigService.getOrmConfig();
			},
			inject: [OrmConfigService],
		}),
		DataBaseModule,
		UserModule,
		AuthModule,
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
