import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigRootModule } from '@app/shared';

@Module({
  imports: [ConfigRootModule.register()],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
