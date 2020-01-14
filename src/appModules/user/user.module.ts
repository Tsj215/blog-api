import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "./controller/user.controller";
import { ProfileEntity } from "./entity/profile.entity";
import { UserService } from "./service/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
