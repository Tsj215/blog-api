import { Module } from "@nestjs/common";

import { ControllerController } from "./controller/article.controller";
import { ArticleService } from "./service/article.service";

@Module({
  controllers: [ControllerController],
  providers: [ArticleService]
})
export class ArticleModule {}
