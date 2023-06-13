import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import * as JOI from 'joi';

@Module({})
export class ConfigRootModule {
  static register(): DynamicModule {
    return {
      module: ConfigRootModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          cache: true,
          envFilePath: './.env',
          validationSchema: JOI.object({
            API_PORT: JOI.number().required(),
            AUTH_PORT: JOI.number().required(),
            USER_PORT: JOI.number().required(),
            MONGODB_URI: JOI.string().required(),
            RABBIT_MQ_URI: JOI.string().required(),
            RABBIT_MQ_AUTH_QUEUE: JOI.string().required(),
            JWT_SECRET: JOI.string().required(),
            JWT_EXPIRATION: JOI.string().required(),
          }),
        }),
      ],
      exports: [ConfigModule],
    };
  }
}
