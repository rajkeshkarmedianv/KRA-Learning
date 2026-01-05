/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/filters/interceptors/response.interceptor';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api')

    // Enable validation pipes
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.useGlobalFilters(new HttpExceptionFilter())
    app.useGlobalInterceptors(new ResponseInterceptor());

    const config = new DocumentBuilder()
    .setTitle('Inventory Management API')
    .setDescription('Inventory Management System APIs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT-auth',
    )
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  } catch (error) {
    console.error(' Error starting the application:', error);
    process.exit(1);
  }
}
bootstrap();
