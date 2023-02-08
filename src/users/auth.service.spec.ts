import { Test, TestingModule } from '@nestjs/testing'; //The @nestjs/testing package provides a set of utilities that enable a more robust testing process.
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { doesNotMatch } from 'assert';
import { targetModulesByContainer } from '@nestjs/core/router/router-module';

const users: User[] = [];
const fakeUserService: Partial<UsersService> = {
  //using partial keyword not define all methods of user service
  // use fakeuserService in any it method bcz it define globally

  find: (email: string) => {
    const filterUser = users.filter((user) => user.email === email);
    return Promise.resolve(filterUser);
  },

  create: (email: string, password: string) => {
    const user = {
      id: Math.floor(Math.random() * 99999),
      email,
      password,
    } as User;
    users.push(user);
    return Promise.resolve(user);
  },
  //find: () => Promise.resolve([]),
  //create: (email: string, password: string) =>
  // Promise.resolve({ id: 1, email, password } as User),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService, //if anyone ask for userservice give them this object
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
    //The compile() method is asynchronous and therefore has to be awaited. Once the module is compiled
    //you can retrieve any static instance it declares (controllers and providers) using the get() method.
  });

  it('can create instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create user with hashed paasword', async () => {
    const user = await service.signup('abc123@gmail.com.com', '	abc123');

    expect(service).not.toEqual('122224');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUserService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    await expect(
      service.signup('abc12343@gmail.com', 'abc123'),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin('test234@gmail.com', '1234jhg'),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws if an invalid password is provided', async () => {
    fakeUserService.find = () =>
      Promise.resolve([
        { email: 'asdf@asdf.com', password: 'laskdjf' } as User,
      ]);
    await expect(
      service.signin('laskdjf@alskdfj.com', 'passowrd'),
    ).rejects.toThrow(BadRequestException);
  });

  it('return user if valid password provide', async () => {
    fakeUserService.find = () =>
      Promise.resolve([
        {
          email: 'test@gmail.com',
          password:
            '7f49c04cebb0aa56.b6fde184a3f65d126196030301a03f175f2995bd79773a054522fde51cbdf740',
        } as User,
      ]);
    const user = await service.signin('test@gmail.com', '1234jhg');
    expect(user).toBeDefined();
  });
});
