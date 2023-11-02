import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AggregateByTenantContextIdStrategy } from './lib/context-id.strategy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger();

  // SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Multi tenant')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());

  await app.listen(3000);

  logger.debug('http://localhost:3000/api/');
}
bootstrap();
