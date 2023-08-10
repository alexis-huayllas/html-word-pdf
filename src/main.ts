/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  const config = new DocumentBuilder()
    .setTitle('API Convert')
    .setDescription('Convert HTML to PDF')
    .setVersion('1.0')
    .addTag('biblioteca')
    .addTag('activo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
