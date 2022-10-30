import { Module } from "@nestjs/common";
import { ConfigurationProvider } from "./config/app/config.module";
import { PosgresDBProvider } from "./config/database/typeorm.module";
import { InternalModulesProvider } from "./config/modules/internal.module";

@Module({
  imports: [ConfigurationProvider, PosgresDBProvider, InternalModulesProvider],
  controllers: [],
  providers: []
})
export class AppModule {}
