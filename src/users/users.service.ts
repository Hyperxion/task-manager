import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findByUsername(username: string) {
    const users = await this.usersRepository.getByUsername(username);

    return users;
  }

  async createUser(registerUserDto: RegisterUserDto) {
    const newUser = await this.usersRepository.createUser(registerUserDto);

    return newUser;
  }
}
