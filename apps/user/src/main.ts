import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get('USER_PORT');
  await app.listen(PORT, () =>
    console.log(`API Gateway is running on ::: ${PORT}`),
  );
}
bootstrap();
