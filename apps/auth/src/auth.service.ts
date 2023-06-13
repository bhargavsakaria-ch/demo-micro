import { User, UserRepository } from '@app/shared';
import { RegisterNewUserDto } from '@app/shared/dtos/register-user.dto';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(newUserDto: RegisterNewUserDto, res: Response) {
    try {
      const newUser: User = await this.userRepository.create({ ...newUserDto });

      res.json(newUser).status(200);
    } catch (error) {
      res.status(500).send(JSON.stringify(error));
    }
  }
}
