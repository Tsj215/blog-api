import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";

import { ArchiveModule } from "../appModules/archive/archive.module";
import { ArticleModule } from "../appModules/article/article.module";
import { MocloudModule } from "../appModules/mocloud/mocloud.module";
import { TagsModule } from "../appModules/tags/tags.module";
import { UserModule } from "../appModules/user/user.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "blog"),
    }),
    UserModule,
    TagsModule,
    MocloudModule,
    ArticleModule,
    ArchiveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
