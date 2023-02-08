import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Repository, TransactionAlreadyStartedError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dtos/auth-credential.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private logger = new Logger('UserServices');
  constructor(@InjectRepository(User) private repo: Repository<User>) {} //for DI with repository to use repo methods

  async create(authcredentialdto: AuthCredentialDto): Promise<User> {
    const { email, password } = authcredentialdto;

    const salt = await bcrypt.genSalt();
    const hashpwd = await bcrypt.hash(password, salt);

    const user = this.repo.create({ email, password: hashpwd });
    try {
      return this.repo.save(user);
    } catch (error) {
      console.log(error.code);
    }
  }

  findOne(id: number): Promise<User> {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { id: id } });
  }

  find(email: string) {
    return this.repo.find({ where: { email: email } });
  }

  async update(id: number, attrs: Partial<User>) {
    //partial is utltility type that all properties set to optional
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs); //user which find and all the properties of user copy in attr object
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}

//export const repoMockFactory: ()=> MockFactory<Repository<any>>=
