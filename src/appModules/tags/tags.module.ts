import { Module } from "@nestjs/common";

import { TagsController } from "./controller/tags.controller";
import { TagsService } from "./service/tags.service";

@Module({
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
