import { Module } from "@nestjs/common";
import { DataBaseService } from "./database.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from "./entity/user.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
	],
	providers: [
		DataBaseService,
	],
	exports: [DataBaseService],
})
export class DataBaseModule {}