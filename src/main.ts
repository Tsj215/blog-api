import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./appliction/app.module";
import { HttpExceptionFilter } from "./shared/filters/http-exception.filter";
import { TransformInterceptor } from "./shared/interceptors/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle("Nli-Blog-Api")
    .setDescription("The Nli-Blog-Api description")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);

  await app.listen(3030);
}
bootstrap();
