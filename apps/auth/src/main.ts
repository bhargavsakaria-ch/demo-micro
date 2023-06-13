import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get('AUTH_PORT');
  await app.listen(PORT, () =>
    console.log(`API Gateway is running on ::: ${PORT}`),
  );
}
bootstrap();
