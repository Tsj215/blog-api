import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TagsController } from "./controller/tags.controller";
import { TagEntity } from "./entity/tag.entity";
import { TagsService } from "./service/tags.service";

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
