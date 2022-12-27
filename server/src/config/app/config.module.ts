import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ThrottlerModule } from "@nestjs/throttler";
import { MulterModule } from "@nestjs/platform-express";
import * as path from "path";

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20 // amount of requests in `ttl seconds`
    }),

    ConfigModule.forRoot({
      envFilePath: !ENV ? ".env" : `.env.${ENV}`,
      cache: true
    }),

    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "..", "..", "..", "static")
    }),

    MulterModule.register({
      dest: path.resolve(__dirname, "..", "..", "..", "static")
    })
  ]
})
export class ConfigurationProvider {}
