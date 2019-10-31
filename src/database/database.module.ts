import { Module } from "@nestjs/common";
import { DataBaseService } from "./database.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from "./entity/user.entity";
import { CreateUserParser } from "./parser/create-user.parser";

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
	],
	providers: [
		DataBaseService,
		CreateUserParser,
	],
	exports: [DataBaseService, CreateUserParser],
})
export class DataBaseModule {}