import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "../../mymodel/entities/User";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private dataSource: DataSource
  ) {}

  async create(
    id: number,
    nickname: string,
    phone: string,
    enrollDate: Date,
    password: string
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const userid = await this.userRepository.findOne({ where: { id } });
      if (userid) {
        throw new ForbiddenException("이미 존재하는 사용자입니다");
      }
      const user = new User();
      (user.id = id),
        (user.nickName = nickname),
        (user.phone = phone),
        (user.enrollDate = enrollDate),
        (user.password = hashedPassword),
        await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
    } catch (error) {
      const userid = await this.userRepository.findOne({ where: { id } });
      if (userid) {
        throw new ForbiddenException("이미 존재하는 사용자입니다");
      }
      console.error(error);
      throw new HttpException("no create user", 401);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async login(_id: string, _password: string): Promise<string> {
    //TODO JWT발급
    throw new Error("Method not implemented");
  }
}
