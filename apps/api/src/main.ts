import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get('API_PORT');
  await app.listen(PORT, () =>
    console.log(`API Gateway is running on ::: ${PORT}`),
  );
}
bootstrap();
