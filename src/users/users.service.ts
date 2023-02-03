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
import Users from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private dataSource: DataSource
  ) {}

  async create(id: string, nickname: string, phone: number, password: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const result = await queryRunner.manager.getRepository(Users).save({
        id,
        nickname,
        phone,
        password: hashedPassword,
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