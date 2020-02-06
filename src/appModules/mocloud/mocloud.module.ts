import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MocloudController } from "./controller/mocloud.controller";
import { MoCloudMsgEntity } from "./entity/message.entity";
import { MocloudService } from "./service/mocloud.service";

@Module({
  imports: [TypeOrmModule.forFeature([MoCloudMsgEntity])],
  controllers: [MocloudController],
  providers: [MocloudService],
  exports: [MocloudService]
})
export class MocloudModule {}
