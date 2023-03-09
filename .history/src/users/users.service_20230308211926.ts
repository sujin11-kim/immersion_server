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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource
  ) {}

  async create(
    id: string,
    nickname: string,
    phone: string,
    favorite: string,
    enrolldate: Date,
    regflag: string,
    password: string,
    type: string
  ) {
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

  async login(id: string, password: string): Promsie<string> {
    throw new Error("Method not implemented");
  }
}
