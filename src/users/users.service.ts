import 
{ 
  ForbiddenException,
  HttpException, 
  HttpStatus, 
  Injectable 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import {User} from '../../mymodel/entities/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private dataSource: DataSource
  ) {}

  async create(ID: number, name: string, phone: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    // const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const result = await queryRunner.manager.getRepository(User).save({
        ID,
        name,
        phone
        // password: hashedPassword,
      });
      return true;
    } 
    catch (error) {
      console.error(error);
      throw error;
    } 
    finally {
      await queryRunner.release();
    }
  }

  async findById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      select: ['id']
    });
  }
}