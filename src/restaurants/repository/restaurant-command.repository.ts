//creat,update,delete            save 관련
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "resource/db/entities/User";
import { Repository } from "typeorm";

@Injectable()
export class CustomRestaurantCommandRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async saveUser(user, locationdto) {
    user.latitude = locationdto.latitude;
    user.longitude = locationdto.longitude;
    return await this.userRepository.save(user);
  }
}
