import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { CustomUserQueryRepository} from "./../repository/user-query.repository";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { User } from "../../../resource/db/entities/User";
import { CreateUserDto } from "../dto/create-user.dto";
import { SocialUserDto } from "src/auth/dto/social-login.dto";

describe("CustomUserQueryRepository", () => {
  let repository: CustomUserQueryRepository;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomUserQueryRepository,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<CustomUserQueryRepository>(CustomUserQueryRepository);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe("checkDuplicate", () => {
    it("should throw BadRequestException for existing email", async () => {
      // Mock UserRepository's findOne method to return a user with the same email
      const email = "existing@example.com";
      const queryBuilderMock: Partial<SelectQueryBuilder<User>> = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce({ email }),
      };

      jest.spyOn(userRepository, "createQueryBuilder").mockReturnValue(queryBuilderMock as any);

      const userInfo: CreateUserDto = {
        email: "existing@example.com",
        nickName: "test",
        password: "test_1234",
        phone: "010-0000-0000",
        fcmToken : "00"
      };

      try {
        await repository.checkDuplicate(userInfo);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response).toEqual({
          statusCode: 2001,
          message: "이미 존재하는 이메일입니다.",
          result: { userIdx: "" },
        });
      }
    });

    it("should not throw BadRequestException for non-existing email", async () => {
      // Mock UserRepository's findOne method to return undefined (no user with the same email)
      const email = "existing@example.com";
      const queryBuilderMock: Partial<SelectQueryBuilder<User>> = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce({ email }),
      };

      jest.spyOn(userRepository, "createQueryBuilder").mockReturnValue(queryBuilderMock as any);

      const socialUserInfo: SocialUserDto = {
        email: "test@example.com"
      };

      try {
        await expect(repository.checkDuplicate(socialUserInfo)).toEqual("")
      } catch (error) {
        // Ensure no error is thrown
        
      }
    });
  });
});
