import { Module } from "@nestjs/common";
import { OrmConfigService } from "./orm-config.service";

@Module({
	providers: [OrmConfigService],
	exports: [OrmConfigService],
})
export class OtherModule {}