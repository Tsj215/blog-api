import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "./controller/user.controller";
import { PhotoGalleryEntity } from "./entity/photoGallery.entity";
import { ProfileEntity } from "./entity/profile.entity";
import { UserEntity } from "./entity/user.entity";
import { QiniuService } from "./service/qiniu.service";
import { UserService } from "./service/user.service";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([ProfileEntity, UserEntity, PhotoGalleryEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, QiniuService],
  exports: [UserService],
})
export class UserModule {}
