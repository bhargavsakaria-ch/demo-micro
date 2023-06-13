import { AbstractRepository } from '@app/shared';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '../entities/user.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  public logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(User.name) userModel: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }
}
