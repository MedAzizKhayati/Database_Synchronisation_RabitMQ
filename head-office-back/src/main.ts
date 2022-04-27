import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const microServiceApp = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'product_sales',
      queueOptions: {
        durable: true,
      },
    },
  });

  await microServiceApp.listen();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(5500);
}
bootstrap();
