import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { model } from 'mongoose';
import { IUser } from '@app/shared';
import { AbstractDocument } from '@app/shared';
import { Exclude } from 'class-transformer';

export interface IUserDocument extends IUser, AbstractDocument {}

@Schema({ timestamps: true })
export class User extends AbstractDocument implements IUser {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  @Exclude({ toClassOnly: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User); //used for registering schema into any mongoose module forFeature/forRoot

export const UserModel = model<IUserDocument>(User.name, UserSchema); // registering model directly from created schema.
