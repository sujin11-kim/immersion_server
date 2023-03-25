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
        const curr = new Date();
        const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
        const KR_TIME_DIFF = 18 * 60 * 60 * 1000;
        const kr_curr = new Date(utc + KR_TIME_DIFF);

        throw new HttpException(
          {
            isSuccess: true,
            code: 2000,
            kr_curr,
            message: "이미 존재하는 id 입니다.",
          },
          200
        );
      }
      console.error(error);
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
