import { Repository } from 'typeorm';
import { User } from './users/user.entity';

export const mockRepo = jest.fn(() => ({
  find: jest.fn((user: User) => user),
  create: jest.fn((user: User) => user),
}));
