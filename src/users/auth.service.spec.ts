import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

interface fakeUser {
  email: string;
  password: string;
}

describe('create', () => {
  let controller: UsersController;
  let service: UsersService;
  let authService: AuthService;

  beforeEach(async () => {
    const modulref = await Test.createTestingModule({
      // controllers: [UsersController],
      providers: [
        UsersService,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue([User]),
            create: jest.fn().mockResolvedValue(User),
          },
        },
      ],
    }).compile();
    // controller = modulref.get(UsersController);
    service = modulref.get<UsersService>(UsersService);
    authService = modulref.get<AuthService>(AuthService);
  });
  it('testing', async () => {
    expect(service).toBeDefined();
  });
  it('sigin user', async () => {
    const user = await authService.signIn('crea@gmail.com', 'hhiohohhohhhooho');
  });
});

// it('create instance of service', async () => {
//   const fakeService: Partial<UsersService> = {
//     find: () => Promise.resolve([]),
//     create: (email: string, password: string) =>
//       Promise.resolve({ id: 1, email, password } as User),
//   };
//   const module = await Test.createTestingModule({
//     imports: [TypeOrmModule.forFeature([User])],
//     providers: [AuthService, { provide: UsersService, useValue: fakeService }],
//   }).compile();
//   const service = await module.get(AuthService);
//   expect(service).toBeDefined();
//   it('creates signup', async () => {
//     const user = await service.signup('uigigigig@gmail.com', 'gygigigiigig');
//     expect(user.password).not.toEqual('gygigigiigig');
//     const [salt, hash] = user.password.split('.');
//     expect(salt).toBeDefined();
//     expect(hash).toBeDefined();
//   });
// });
