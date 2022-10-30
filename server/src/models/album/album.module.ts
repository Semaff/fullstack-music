import { Module, forwardRef } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "./entities/album.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Album]), forwardRef(() => UserModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService]
})
export class AlbumModule {}
