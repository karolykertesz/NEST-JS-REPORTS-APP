import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
  findOne(id: number) {
    if (!id) {
      throw new NotFoundException('No user signed in');
    }
    return this.repo.findOne(id);
  }
  find(email: string) {
    return this.repo.find({ email: email });
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotAcceptableException('No user');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  async remove(id) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotAcceptableException('No user');
    }
    this.repo.remove(user);
  }
}
