import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "../../mymodel/entities/User";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource
  ) {}

  async create(data: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    // const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const result = await queryRunner.manager.getRepository(User).save({
        id,
        nickname,
        phone,
        favorite,
        enrolldate,
        regflag,
        password,
        type,
      });
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
