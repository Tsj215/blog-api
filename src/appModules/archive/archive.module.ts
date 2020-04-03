import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleEntity } from "../../appModules/article/entity/article.entity";
import { TagEntity } from "../../appModules/tags/entity/tag.entity";

import { ArchiveController } from "./controller/archive.controller";
import { ArchiveService } from "./service/archive.service";

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, ArticleEntity])],
  controllers: [ArchiveController],
  providers: [ArchiveService]
})
export class ArchiveModule {}
