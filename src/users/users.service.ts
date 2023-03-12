import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "../../mymodel/entities/user.entity";

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

    await queryRunner.startTransaction();
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const user = new User();
      //const hashedpassword = await bcrypt.hash(user.password, 12);
      (user.id = id),
        (user.nickname = nickname),
        (user.phone = phone),
        (user.favorite = favorite),
        (user.enrolldate = enrolldate),
        (user.regflag = regflag),
        (user.password = hashedPassword),
        //(user.password = password),
        (user.type = type);
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // async login(_id: string, _password: string): Promise<string> {
  //   //TODO JWT발급
  //   throw new Error("Method not implemented");
  // }

}
