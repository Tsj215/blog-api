import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleEntity } from "../article/entity/article.entity";
import { ImageEntity } from "../article/entity/imagelist.entity";

import { ControllerController } from "./controller/article.controller";
import { ArticleService } from "./service/article.service";

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, ImageEntity])],
  controllers: [ControllerController],
  providers: [ArticleService]
})
export class ArticleModule {}
