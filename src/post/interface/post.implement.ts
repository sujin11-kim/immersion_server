// import { BadRequestException, Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { HttpException } from "@nestjs/common";
// import * as bcrypt from "bcrypt";
// import { User } from "../../../resource/db/entities/User";
// import { Repository } from "typeorm";
// import { UserInterface } from "../../users/interface/user.interface";
// import { CreateUserDto } from "../../users/dto/create-user.dto";
// import { CustomUserRepository } from "../../users/repository/user.repository";

// @Injectable()
// export class UserImpl implements UserInterface {
//   constructor(
//     private readonly userRepository: CustomUserRepository,
//     @InjectRepository(User)
//     private userEntityRepository: Repository<User>
//   ) {}

//   //회원가입
//   async createUser(userInfo: CreateUserDto): Promise<{ userIdx: number }> {
//     const queryRunner =
//       this.userEntityRepository.manager.connection.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     try {
//       const hashedPassword = await bcrypt.hash(userInfo.password, 12);
//       await this.userRepository.checkDuplicate(userInfo);

//       const newUser = await this.userRepository.saveUser({
//         ...userInfo,
//         password: hashedPassword,
//       });

//       await queryRunner.commitTransaction();
//       return { userIdx: newUser.userIdx };
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       throw error;
//     } finally {
//       await queryRunner.release();
//     }
//   }
// }
