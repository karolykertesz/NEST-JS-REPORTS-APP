import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    @InjectRepository(User) private repo: Repository<User>,
  ) {}
  signIn() {}
  async signup(email: string, password: string) {
    const userEx = await this.userService.find(email);
    if (userEx.length) {
      throw new BadRequestException('No user on this email');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = await this.userService.create(email, result);
    return user;
  }
}
