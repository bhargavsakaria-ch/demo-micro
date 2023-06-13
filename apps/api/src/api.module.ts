import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ConfigRootModule } from '@app/shared';

@Module({
  imports: [ConfigRootModule.register()],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
